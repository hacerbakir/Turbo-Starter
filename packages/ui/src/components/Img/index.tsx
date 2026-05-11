'use client';

import { CSSProperties, useMemo, useState, useEffect, useRef } from 'react';
import NextImage, { ImageProps as NextImageProps } from 'next/image';
import clsx from 'clsx';
import placeholderImg from './placeholder.png';
export interface ImgSource {
  src: string;
  media?: string;
  type?: string;
}

export interface ImgProps extends Omit<NextImageProps, 'src' | 'objectPosition' | 'fill'> {
  src?: string | { default: string; [key: string]: string };
  sources?: ImgSource[];
  fallbackSrc?: string;
  objectFit?: CSSProperties['objectFit'];
  objectPosition?: CSSProperties['objectPosition'];
  imageClassName?: string;
  onError?: () => void;
  sizes?: string;
  style?: CSSProperties;
  bordered?: boolean;
}

export default function Img({
  src,
  sources,
  fallbackSrc = placeholderImg,
  alt,
  objectPosition = 'center',
  objectFit = 'cover',
  className = '',
  imageClassName = '',
  onError,
  sizes,
  style,
  bordered = false,
  priority = false,
  ...restProps
}: ImgProps) {
  const [shouldRenderImage, setShouldRenderImage] = useState(priority);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const initialSrc =
    sources && sources.length > 0
      ? sources[sources.length - 1].src
      : typeof src === 'string'
        ? src
        : src?.default || fallbackSrc;

  const [imgSrc, setImgSrc] = useState<string>(initialSrc);

  const isSvg = useMemo(() => {
    return (
      (typeof imgSrc === 'string' && imgSrc.toLowerCase().endsWith('.svg')) ||
      (typeof imgSrc === 'string' && imgSrc.startsWith('data:image/svg'))
    );
  }, [imgSrc]);

  useEffect(() => {
    if (shouldRenderImage || priority) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldRenderImage(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px', threshold: 0.01 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [shouldRenderImage, priority]);

  const borderClass = useMemo(
    () => (bordered ? 'before:absolute before:inset-4 before:border before:border-white before:z-20' : ''),
    [bordered]
  );

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
      onError?.();
    }
  };

  const commonStyles: CSSProperties = {
    objectPosition,
    ...(objectFit && { objectFit }),
    ...style,
  };

  const containerClasses = clsx(
    'relative overflow-hidden',
    !isLoaded && !isSvg ? 'bg-gray-400' : '',
    className,
    borderClass,
    isSvg && !isLoaded ? 'animate-pulse duration-50' : ''
  );

  const imgClasses = clsx(
    imageClassName,
    !isSvg && 'transition-all duration-700 ease-out',

    isSvg
      ? isLoaded
        ? 'opacity-100'
        : 'opacity-0'
      : !isLoaded
        ? 'blur-xl scale-105 opacity-0'
        : 'blur-0 scale-100 opacity-100'
  );

  const renderImageComponent = () => (
    <NextImage
      {...restProps}
      src={imgSrc}
      alt={alt ?? 'Image'}
      fill
      loading={priority ? 'eager' : 'lazy'}
      priority={priority}
      style={commonStyles}
      className={imgClasses}
      onError={handleError}
      onLoad={(e) => {
        const target = e.target as HTMLImageElement;
        if (target.src.indexOf('data:') !== 0) setIsLoaded(true);
        else setIsLoaded(true);
      }}
      sizes={sizes}
      placeholder={isSvg ? undefined : 'empty'}
      blurDataURL={isSvg ? undefined : restProps.blurDataURL}
    />
  );

  return (
    <div ref={containerRef} className={containerClasses}>
      {shouldRenderImage ? (
        sources && sources.length > 0 ? (
          <picture className='w-full h-full'>
            {sources.map((source, index) => (
              <source key={index} srcSet={source.src} media={source.media} type={source.type} />
            ))}
            {renderImageComponent()}
          </picture>
        ) : (
          renderImageComponent()
        )
      ) : (
        <div className='flex items-center justify-center w-full h-full' aria-hidden='true'>
          <i className='fi fi-rr-picture' />
        </div>
      )}
    </div>
  );
}
