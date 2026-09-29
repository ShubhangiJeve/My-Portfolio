import { useState, useEffect, useRef } from 'react';
import './VisitorCounter.css';

const PRIMARY_API = 'https://countapi.mileshilliard.com/api/v1';
const FALLBACK_API = 'https://abacus.jasoncameron.dev';
const KEY_NAME = 'shubhangijeve-portfolio';
const STORAGE_CACHE_KEY = 'portfolio_visitor_count';
const SESSION_FLAG_KEY = 'portfolio_visited_session';

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(() => {
    // Initialize from cached value for instant display without flash
    const cached = localStorage.getItem(STORAGE_CACHE_KEY);
    return cached ? parseInt(cached, 10) : null;
  });
  const [displayCount, setDisplayCount] = useState<number | null>(() => {
    const cached = localStorage.getItem(STORAGE_CACHE_KEY);
    return cached ? parseInt(cached, 10) : null;
  });
  const [isLoading, setIsLoading] = useState<boolean>(count === null);
  const [isLive, setIsLive] = useState<boolean>(false);
  const prevCountRef = useRef<number | null>(count);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4500);

    async function fetchVisitorCount() {
      const alreadyVisited = sessionStorage.getItem(SESSION_FLAG_KEY);
      const isNewSession = !alreadyVisited;

      let fetchedCount: number | null = null;

      // 1. Try Primary API (CountAPI by Miles Hilliard)
      try {
        const endpoint = isNewSession
          ? `${PRIMARY_API}/hit/${KEY_NAME}`
          : `${PRIMARY_API}/get/${KEY_NAME}`;

        const res = await fetch(endpoint, {
          signal: controller.signal,
          headers: { Accept: 'application/json' },
        });

        if (res.ok) {
          const data = await res.json();
          if (typeof data.value === 'number') {
            fetchedCount = data.value;
          }
        }
      } catch {
        // Primary failed or timed out, will attempt fallback
      }

      // 2. Try Fallback API (Abacus) if primary didn't resolve
      if (fetchedCount === null && !controller.signal.aborted) {
        try {
          const fallbackEndpoint = isNewSession
            ? `${FALLBACK_API}/hit/shubhangijeve/portfolio`
            : `${FALLBACK_API}/get/shubhangijeve/portfolio`;

          const res = await fetch(fallbackEndpoint, {
            signal: controller.signal,
            headers: { Accept: 'application/json' },
          });

          if (res.ok) {
            const data = await res.json();
            if (typeof data.value === 'number') {
              fetchedCount = data.value;
            }
          }
        } catch {
          // Both failed (network offline or adblocker)
        }
      }

      if (!isMounted) return;

      if (fetchedCount !== null && fetchedCount > 0) {
        if (isNewSession) {
          try {
            sessionStorage.setItem(SESSION_FLAG_KEY, 'true');
          } catch {
            // Ignore quota or disabled storage
          }
        }

        try {
          localStorage.setItem(STORAGE_CACHE_KEY, String(fetchedCount));
        } catch {
          // Ignore storage errors
        }

        setCount(fetchedCount);
        setIsLive(true);
      }

      setIsLoading(false);
    }

    fetchVisitorCount();

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, []);

  // Smooth number count-up animation when count changes or loads
  useEffect(() => {
    if (count === null) return;

    const prev = prevCountRef.current;
    if (prev === count) {
      return;
    }

    const start = prev !== null && prev > 0 && Math.abs(count - prev) < 50
      ? prev
      : Math.max(0, count - 25);

    prevCountRef.current = count;

    const duration = 800; // ms
    const startTime = performance.now();
    let animationFrameId: number;

    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.round(start + (count - start) * ease);
      setDisplayCount(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [count]);

  const formattedCount = displayCount !== null
    ? new Intl.NumberFormat('en-US').format(displayCount)
    : null;

  return (
    <div
      className="visitor-counter"
      role="status"
      aria-label={
        formattedCount
          ? `Portfolio visitor count: ${formattedCount} visits`
          : 'Portfolio visitor counter loading'
      }
      title="Live portfolio visitor counter (session-tracked)"
    >
      <div className="visitor-counter__badge">
        <span className="visitor-counter__pulse" aria-hidden="true">
          <span className={`visitor-counter__dot ${isLive ? 'visitor-counter__dot--live' : ''}`} />
        </span>

        {/* View / Visitors SVG Icon */}
        <svg
          className="visitor-counter__icon"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>

        <span className="visitor-counter__label">Visits</span>

        <span className="visitor-counter__count">
          {isLoading && !formattedCount ? (
            <span className="visitor-counter__skeleton" aria-hidden="true" />
          ) : (
            formattedCount ?? '—'
          )}
        </span>
      </div>
    </div>
  );
}
