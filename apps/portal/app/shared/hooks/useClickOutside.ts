import { useEffect, useRef } from 'react';

export interface ClickOutsideProps {
  isOpen: boolean;
  handler?: () => void;
}

export default function useClickOutside<T extends HTMLElement>({ 
  isOpen, 
  handler 
}: ClickOutsideProps) {
  const ref = useRef<T>(null);
  const handlerRef = useRef(handler);
  
  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!isOpen) return;

    const listener = (event: MouseEvent | TouchEvent) => {
      const element = ref.current;
      
      if (!element || element.contains(event.target as Node)) {
        return;
      }

      handlerRef.current?.();
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [isOpen]); 

  return ref;
}