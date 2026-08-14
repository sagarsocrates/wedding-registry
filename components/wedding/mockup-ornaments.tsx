/** Gold lotus / mandala mark */
export function HeaderMandala({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      width="28"
      height="28"
      viewBox="0 0 36 36"
      fill="none"
    >
      <circle cx="18" cy="18" r="2" fill="currentColor" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <ellipse
            key={deg}
            cx={18 + Math.cos(rad) * 7}
            cy={18 + Math.sin(rad) * 7}
            rx="3.2"
            ry="5.5"
            transform={`rotate(${deg} ${18 + Math.cos(rad) * 7} ${18 + Math.sin(rad) * 7})`}
            stroke="currentColor"
            strokeWidth="0.85"
            fill="currentColor"
            fillOpacity="0.12"
          />
        );
      })}
      <circle cx="18" cy="18" r="10.5" stroke="currentColor" strokeWidth="0.7" opacity="0.55" />
    </svg>
  );
}

export function GoldSideFlourish({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden className={className} width="72" height="14" viewBox="0 0 72 14" fill="none">
      <path d="M2 7h26" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M44 7h26" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path
        d="M36 1.5c-1.8 1.6-2.8 3-2.8 5.5S34.2 12 36 12s2.8-1.6 2.8-5c0-2.5-1-3.9-2.8-5.5Z"
        fill="currentColor"
      />
      <circle cx="30" cy="7" r="1.15" fill="currentColor" />
      <circle cx="42" cy="7" r="1.15" fill="currentColor" />
    </svg>
  );
}

export function TitleFlourish({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden className={className} width="100" height="18" viewBox="0 0 100 18" fill="none">
      <path d="M6 9h30" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M64 9h30" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path
        d="M50 2c-2.4 2.2-3.8 4-3.8 6.5S47.7 15 50 15s3.8-1.9 3.8-6.5S52.4 4.2 50 2Z"
        fill="currentColor"
      />
      <circle cx="38" cy="9" r="1.3" fill="currentColor" />
      <circle cx="62" cy="9" r="1.3" fill="currentColor" />
      <path
        d="M34 9c2.5-3.5 6-4.5 10-3.5M66 9c-2.5-3.5-6-4.5-10-3.5"
        stroke="currentColor"
        strokeWidth="0.85"
        opacity="0.75"
      />
    </svg>
  );
}

export function FiligreeCorner({
  className = "",
  flipX = false,
  flipY = false,
}: {
  className?: string;
  flipX?: boolean;
  flipY?: boolean;
}) {
  return (
    <svg
      aria-hidden
      className={className}
      width="42"
      height="42"
      viewBox="0 0 42 42"
      fill="none"
      style={{
        transform: `scale(${flipX ? -1 : 1}, ${flipY ? -1 : 1})`,
      }}
    >
      <path
        d="M4 4h18M4 4v18"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
      <path
        d="M4 14c8-.5 14-6.5 15-14M14 4c.5 8 6.5 14 14 15"
        stroke="currentColor"
        strokeWidth="0.95"
        opacity="0.9"
      />
      <path
        d="M8 22c5-1 9-4 11-9M22 8c1 5 4 9 9 11"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.7"
      />
      <circle cx="9" cy="9" r="1.4" fill="currentColor" />
      <circle cx="4" cy="4" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function BarEndOrnament({
  className = "",
  side = "left",
}: {
  className?: string;
  side?: "left" | "right";
}) {
  return (
    <svg
      aria-hidden
      className={className}
      width="18"
      height="72"
      viewBox="0 0 18 72"
      fill="none"
      style={{ transform: side === "right" ? "scaleX(-1)" : undefined }}
    >
      <path
        d="M14 4c-6 8-8 18-8 32s2 24 8 32"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M10 10c-4 6-5 14-5 26s1 20 5 26"
        stroke="currentColor"
        strokeWidth="0.9"
        opacity="0.75"
      />
      <circle cx="12" cy="36" r="2" fill="currentColor" />
      <circle cx="12" cy="18" r="1.2" fill="currentColor" />
      <circle cx="12" cy="54" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function RegionLabel({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <p
      className={`flex items-center justify-center gap-2 font-ceremony text-[0.62rem] tracking-[0.28em] text-[#6a5344] uppercase ${className}`}
    >
      <span aria-hidden className="text-gold">
        ←
      </span>
      {label}
      <span aria-hidden className="text-gold">
        →
      </span>
    </p>
  );
}
