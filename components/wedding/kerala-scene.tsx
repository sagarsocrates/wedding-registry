/** Delicate Kerala nalukettu / backwater gold line illustration */
export function KeralaScene({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      viewBox="0 0 420 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Water */}
      <path
        d="M20 210c40-8 80-8 120 0s80 8 120 0 80-8 120 0"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.55"
      />
      <path
        d="M40 222c35-6 70-6 105 0s70 6 105 0 70-6 105 0"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.35"
      />

      {/* Boat */}
      <path
        d="M168 208c18 8 52 8 74 0-8 10-58 12-74 0Z"
        stroke="currentColor"
        strokeWidth="1.3"
        fill="currentColor"
        fillOpacity="0.08"
      />
      <path d="M205 188v22" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M205 188c14 2 28 10 34 20"
        stroke="currentColor"
        strokeWidth="1.1"
      />

      {/* House body */}
      <rect
        x="118"
        y="118"
        width="150"
        height="78"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.4"
        fill="currentColor"
        fillOpacity="0.04"
      />
      {/* Roof */}
      <path
        d="M108 122 L193 78 L278 122"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="currentColor"
        fillOpacity="0.07"
      />
      <path
        d="M128 118 L193 88 L258 118"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.7"
      />
      {/* Pillars / veranda */}
      <path d="M138 196v-40M158 196v-40M238 196v-40M258 196v-40" stroke="currentColor" strokeWidth="1.1" />
      <path d="M132 156h122" stroke="currentColor" strokeWidth="1" />
      {/* Door */}
      <rect x="188" y="150" width="28" height="46" rx="1" stroke="currentColor" strokeWidth="1.2" />
      {/* Windows */}
      <rect x="148" y="138" width="22" height="18" stroke="currentColor" strokeWidth="1" />
      <rect x="234" y="138" width="22" height="18" stroke="currentColor" strokeWidth="1" />

      {/* Palms */}
      <path d="M78 196c2-42 8-70 14-88" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M92 108c-18-4-30 6-34 18M92 108c-8-16 2-28 16-30M92 108c14-8 28 0 32 14"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path d="M318 196c-2-46-6-74-10-92" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M308 104c-16-10-32-4-38 10M308 104c4-18 18-26 32-22M308 104c16-2 28 10 28 24"
        stroke="currentColor"
        strokeWidth="1.1"
      />

      {/* Plumeria accents */}
      <g opacity="0.9">
        <circle cx="56" cy="48" r="4" fill="currentColor" fillOpacity="0.15" stroke="currentColor" />
        <circle cx="68" cy="42" r="4" fill="currentColor" fillOpacity="0.15" stroke="currentColor" />
        <circle cx="64" cy="54" r="4" fill="currentColor" fillOpacity="0.15" stroke="currentColor" />
        <circle cx="62" cy="48" r="2" fill="currentColor" />
      </g>
      <g opacity="0.9">
        <circle cx="360" cy="56" r="4" fill="currentColor" fillOpacity="0.15" stroke="currentColor" />
        <circle cx="372" cy="50" r="4" fill="currentColor" fillOpacity="0.15" stroke="currentColor" />
        <circle cx="368" cy="62" r="4" fill="currentColor" fillOpacity="0.15" stroke="currentColor" />
        <circle cx="366" cy="56" r="2" fill="currentColor" />
      </g>
    </svg>
  );
}

export function GoldFlourish({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      width="72"
      height="18"
      viewBox="0 0 72 18"
      fill="none"
    >
      <path
        d="M4 9h20M48 9h20"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M36 3c-2 2.2-3.4 4.2-3.4 6s1.5 3.5 3.4 3.5 3.4-1.6 3.4-3.5c0-1.8-1.4-3.8-3.4-6Z"
        fill="currentColor"
      />
      <circle cx="24" cy="9" r="1.4" fill="currentColor" />
      <circle cx="48" cy="9" r="1.4" fill="currentColor" />
    </svg>
  );
}
