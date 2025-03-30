"use client"

import { useEffect, useRef, Dispatch, SetStateAction } from "react";

interface IntersectionObserverOptions {
  root: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  toggle?: boolean;
}

 export const useIntersectionObserver = (
  setInView: Dispatch<SetStateAction<boolean>>,
  options: IntersectionObserverOptions,
  mouseTilt: boolean = false,
  toggle?: boolean
) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<Element | null>(null);

  useEffect(() => {
    if (options.root && typeof options.root === 'string') {
      rootRef.current = document.getElementById(options.root);
    } else {
      rootRef.current = options.root;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (!toggle) {
          observer.disconnect();
        }
      } else if (toggle) {
        setInView(false);
      }
    }, {
      ...options,
      root: rootRef.current,
    });

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }
    else if(toggle === true){
      setInView(false);
    }

    return () => {
      if (componentRef.current) {
        observer.unobserve(componentRef.current);
      }
    };
  }, [setInView, options, toggle]);

  useEffect(() => {
    if (!mouseTilt || !componentRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = componentRef.current?.getBoundingClientRect();
      if (rect) {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX = ((y / rect.height) - 0.5) * -30;
        const rotateY = ((x / rect.width) - 0.5) * 30;
        if (componentRef.current) {
          componentRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
      }
    };

    const handleMouseLeave = () => {
      if (componentRef.current) {
        componentRef.current.style.transform = 'rotateX(0deg) rotateY(0deg)';
      }
    };

    const currentRef = componentRef.current;
    currentRef.addEventListener('mousemove', handleMouseMove);
    currentRef.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      currentRef.removeEventListener('mousemove', handleMouseMove);
      currentRef.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseTilt]);

  return componentRef;
};



export const useVideoIntersectionObserver = (
  setInView: Dispatch<SetStateAction<boolean>>,
  options: IntersectionObserverOptions,
  toggle?: boolean // Note: Toggle is an optional parameter, not `true`
) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rootRef = useRef<Element | null>(null);

  useEffect(() => {
    if (options.root && typeof options.root === 'string') {
      rootRef.current = document.getElementById(options.root);
    } else {
      rootRef.current = options.root;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (!toggle) {
          observer.disconnect();
        }
      } else if (toggle) {
        setInView(false);
      }
    }, {
      ...options,
      root: rootRef.current,
    });

    if (videoRef.current) {
      observer.observe(videoRef.current);
    } else if (toggle) {
      setInView(false); // Ensure that `setInView` is set to `false` if `toggle` is true and the video is not present
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, [setInView, options, toggle]);

  return videoRef;
};
  