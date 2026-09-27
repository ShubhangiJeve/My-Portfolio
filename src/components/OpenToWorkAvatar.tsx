import { useId, useState } from 'react';
import './OpenToWorkAvatar.css';

interface OpenToWorkAvatarProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
  showFrame?: boolean;
  priority?: boolean;
}

export default function OpenToWorkAvatar({
  src,
  alt,
  size = 40,
  className = '',
  showFrame = true,
}: OpenToWorkAvatarProps) {
  const [hasError, setHasError] = useState(false);
  const rawId = useId().replace(/[^a-zA-Z0-9]/g, '');
  const clipId = `otw-clip-${rawId}`;
  const textPathId = `otw-text-${rawId}`;

  const initials = alt
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'SJ';

  return (
    <div
      className={`otw-avatar ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
      role="img"
      aria-label={alt}
    >
      <svg
        viewBox="0 0 120 120"
        width="100%"
        height="100%"
        className="otw-avatar__svg"
      >
        <defs>
          {/* Circle clip for the photo */}
          <clipPath id={clipId}>
            <circle cx="60" cy="60" r="53" />
          </clipPath>

          {/* Text path for the curved #OPEN TO WORK banner centered at radius 48.5 */}
          <path
            id={textPathId}
            d="M 15 78.2 A 48.5 48.5 0 0 0 105 78.2"
            fill="none"
          />
        </defs>

        {/* Profile Image (clipped to circle) or fallback */}
        {!hasError && src ? (
          <image
            href={src}
            x="7"
            y="7"
            width="106"
            height="106"
            clipPath={`url(#${clipId})`}
            preserveAspectRatio="xMidYMid slice"
            onError={() => setHasError(true)}
          />
        ) : (
          <g clipPath={`url(#${clipId})`}>
            <circle cx="60" cy="60" r="53" fill="#1c1712" />
            <text
              x="60"
              y="66"
              fill="#ffffff"
              fontSize="24"
              fontWeight="700"
              fontFamily="var(--font-display), Georgia, serif"
              textAnchor="middle"
            >
              {initials}
            </text>
          </g>
        )}

        {showFrame && (
          <g className="otw-avatar__frame-group">
            {/* Outer Green Ring (R=53 with 3px stroke -> outer radius = 54.5) */}
            <circle
              cx="60"
              cy="60"
              r="53"
              fill="none"
              stroke="#0a8754"
              strokeWidth="3"
            />

            {/* Seamless Annular Ribbon (outer radius = 54.5, inner radius = 42.5) */}
            <path
              d="M 9.47 80.42 A 54.5 54.5 0 0 0 110.53 80.42 L 99.41 75.92 A 42.5 42.5 0 0 1 20.59 75.92 Z"
              fill="#0a8754"
            />

            {/* Curved White Text: #OPEN TO WORK */}
            <text
              fill="#ffffff"
              fontSize="6.6"
              fontWeight="800"
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
              letterSpacing="0.10em"
              dy="2.4"
            >
              <textPath href={`#${textPathId}`} startOffset="50%" textAnchor="middle">
                #OPEN TO WORK
              </textPath>
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}
