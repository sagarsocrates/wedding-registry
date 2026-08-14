type OrnamentProps = {
  className?: string;
};

/** Gold kolam-inspired divider used across ceremonial pages */
export function FloralDivider({ className = "" }: OrnamentProps) {
  return (
    <div
      className={`flex items-center justify-center gap-3 text-gold ${className}`}
      aria-hidden
    >
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold sm:w-20" />
      <svg width="54" height="18" viewBox="0 0 54 18" fill="none">
        <path
          d="M27 2.5c-2.4 2.2-4 4.4-4 6.5 0 2.4 1.8 4 4 4s4-1.6 4-4c0-2.1-1.6-4.3-4-6.5Z"
          fill="currentColor"
          fillOpacity="0.85"
        />
        <circle cx="10" cy="9" r="1.6" fill="currentColor" />
        <circle cx="44" cy="9" r="1.6" fill="currentColor" />
        <path
          d="M16 9h8M30 9h8"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M4 9c2-3 4-4.5 6-4.5S14 6 16 9c-2 3-4 4.5-6 4.5S6 12 4 9ZM38 9c2-3 4-4.5 6-4.5S50 6 52 9c-2 3-4 4.5-6 4.5S40 12 38 9Z"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />
      </svg>
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold sm:w-20" />
    </div>
  );
}

/** Mango-leaf inspired thoranam for ceremonial headers */
export function Thoranam({ className = "" }: OrnamentProps) {
  return (
    <svg
      aria-hidden
      className={`mx-auto text-leaf ${className}`}
      width="220"
      height="36"
      viewBox="0 0 220 36"
      fill="none"
    >
      <path
        d="M10 8c8 0 14 6 20 12 6-8 13-12 21-12 7 0 13 3 18 8 5-6 12-10 20-10s15 4 20 10c5-5 11-8 18-8 8 0 15 4 21 12 6-6 12-12 20-12"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M30 20c3 4 6 7 10 8M70 16c3 5 7 8 12 9M110 14c3 5 7 9 12 10M150 16c3 5 7 8 12 9M190 20c3 4 6 7 10 8"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.7"
      />
      <circle cx="110" cy="10" r="2" fill="var(--gold)" />
    </svg>
  );
}

export function CornerKolam({
  className = "",
  flipX = false,
  flipY = false,
}: OrnamentProps & { flipX?: boolean; flipY?: boolean }) {
  const scaleX = flipX ? -1 : 1;
  const scaleY = flipY ? -1 : 1;
  return (
    <svg
      aria-hidden
      className={`text-gold ${className}`}
      width="42"
      height="42"
      viewBox="0 0 42 42"
      fill="none"
      style={{ transform: `scale(${scaleX}, ${scaleY})` }}
    >
      <path
        d="M4 4h12M4 4v12"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="10" cy="10" r="2" fill="currentColor" />
      <path
        d="M18 6c4 1 7 4 8 8M6 18c1 4 4 7 8 8"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.75"
      />
    </svg>
  );
}
