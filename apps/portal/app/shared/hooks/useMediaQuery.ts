import { useEffect, useRef, useSyncExternalStore } from 'react';

export interface MediaQueryOptions {
  /** The media query string. */
  query: string;
  /** The callback function to be executed when the media query matches. */
  callback?: () => void;
}

/**
 * A custom hook that allows you to listen for changes in a media query.
 * @param query - The media query string.
 * @param callback - The callback function to be executed when the media query matches.
 * @returns A mutable ref object that can be used to reference the DOM element.
 */
export default function useMediaQuery({ query, callback }: MediaQueryOptions): boolean {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);


  const subscribe = (onStoreChange: () => void) => {
    const matchMedia = window.matchMedia(query);
    
    const listener = (e: MediaQueryListEvent) => {
      if (e.matches) callbackRef.current?.();
      onStoreChange();
    };

    matchMedia.addEventListener('change', listener);
    return () => matchMedia.removeEventListener('change', listener);
  };


const getSnapshot = () => window.matchMedia(query).matches;
 const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
