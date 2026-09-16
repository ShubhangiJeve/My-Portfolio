// ─────────────────────────────────────────────
//  useIntersectionObserver — Reveal animations
// ─────────────────────────────────────────────

import { useEffect, useRef, useState, type RefObject } from 'react';

interface Options extends IntersectionObserverInit {
  /** Only trigger once (default: true) */
  triggerOnce?: boolean;
}

export function useIntersectionObserver<T extends Element>(
  options: Options = {}
): [RefObject<T | null>, boolean] {
  const { triggerOnce = true, threshold = 0.15, rootMargin = '0px', ...rest } = options;
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) observer.unobserve(el);
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin, ...rest }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [triggerOnce, threshold, rootMargin]);

  return [ref, isVisible];
}
