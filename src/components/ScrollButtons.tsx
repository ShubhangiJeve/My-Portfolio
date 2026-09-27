import { useState, useEffect } from 'react';
import './ScrollButtons.css';

interface ScrollButtonsProps {
  className?: string;
}

export default function ScrollButtons({ className = '' }: ScrollButtonsProps) {
  const [atTop, setAtTop] = useState(true);
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      setAtTop(scrollY <= 20);
      setAtBottom(scrollY + windowHeight >= docHeight - 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const handleScrollUp = () => {
    if (atTop) return;
    if (window.scrollY < window.innerHeight * 1.2) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollBy({
        top: -Math.min(window.innerHeight * 0.85, window.scrollY),
        behavior: 'smooth',
      });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollDown = () => {
    if (atBottom) return;
    const docHeight = document.documentElement.scrollHeight;
    const remaining = docHeight - (window.scrollY + window.innerHeight);
    if (remaining <= 5) return;

    window.scrollBy({
      top: Math.min(window.innerHeight * 0.85, remaining),
      behavior: 'smooth',
    });
  };

  const handleScrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <aside
      className={`scroll-buttons ${className}`}
      aria-label="Scroll navigation controls"
    >
      <div className="scroll-buttons__pill">
        {/* Scroll Up Button */}
        <button
          type="button"
          className={`scroll-buttons__btn scroll-buttons__btn--up ${atTop ? 'scroll-buttons__btn--disabled' : ''}`}
          onClick={handleScrollUp}
          onDoubleClick={handleScrollToTop}
          disabled={atTop}
          aria-label="Scroll up (double-click for top)"
          title="Scroll up (double-click for top)"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>

        {/* Subtle Divider */}
        <span className="scroll-buttons__divider" aria-hidden="true" />

        {/* Scroll Down Button */}
        <button
          type="button"
          className={`scroll-buttons__btn scroll-buttons__btn--down ${atBottom ? 'scroll-buttons__btn--disabled' : ''}`}
          onClick={handleScrollDown}
          onDoubleClick={handleScrollToBottom}
          disabled={atBottom}
          aria-label="Scroll down (double-click for bottom)"
          title="Scroll down (double-click for bottom)"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>
    </aside>
  );
}
