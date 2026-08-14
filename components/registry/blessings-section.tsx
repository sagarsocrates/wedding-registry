import { FiligreeCorner } from "@/components/wedding/mockup-ornaments";

const BLESSINGS = [
  {
    title: "Handpicked with love",
    text: "Every gift is something we truly appreciate.",
    icon: (
      <svg viewBox="0 0 40 40" className="h-9 w-9 sm:h-10 sm:w-10" fill="none" aria-hidden>
        <path
          d="M20 8c-1.8 3.2-5.5 6.4-5.5 10.4S17.4 27 20 27s5.5-3.8 5.5-8.6S21.8 11.2 20 8Z"
          stroke="currentColor"
          strokeWidth="1.3"
        />
        <path
          d="M13 18.5c-3 .6-5.6 2.2-7 4.8 2.4.9 5.4.7 7.8 0M27 18.5c3 .6 5.6 2.2 7 4.8-2.4.9-5.4.7-7.8 0"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <circle cx="20" cy="17.5" r="1.6" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Your blessings",
    text: "Your love and good wishes mean everything.",
    icon: (
      <svg viewBox="0 0 40 40" className="h-9 w-9 sm:h-10 sm:w-10" fill="none" aria-hidden>
        <path
          d="M20 31S10 24.2 10 17.2A5.9 5.9 0 0 1 20 13a5.9 5.9 0 0 1 10 4.2C30 24.2 20 31 20 31Z"
          stroke="currentColor"
          strokeWidth="1.35"
        />
      </svg>
    ),
  },
  {
    title: "Our new beginning",
    text: "Help us build a home filled with love.",
    icon: (
      <svg viewBox="0 0 40 40" className="h-9 w-9 sm:h-10 sm:w-10" fill="none" aria-hidden>
        <path d="M9 19 L20 9.5 L31 19v13H9V19Z" stroke="currentColor" strokeWidth="1.35" />
        <path
          d="M20 18.5c-1.3 1.3-3.2 1.3-3.2 0S18.7 16 20 14.8c1.3 1.1 3.2 2.2 3.2 3.7s-1.9 1.3-3.2 0Z"
          stroke="currentColor"
          strokeWidth="1.15"
        />
      </svg>
    ),
  },
  {
    title: "Thank you",
    text: "From the bottom of our hearts.",
    icon: (
      <svg viewBox="0 0 40 40" className="h-9 w-9 sm:h-10 sm:w-10" fill="none" aria-hidden>
        {/* Nilavilakku / diya */}
        <path
          d="M20 8c-1.4 2-2.2 3.4-2.2 5a2.2 2.2 0 0 0 4.4 0c0-1.6-.8-3-2.2-5Z"
          fill="currentColor"
          fillOpacity="0.85"
        />
        <path d="M12 18h16" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <path
          d="M13.5 18c0 3.5 2.8 6 6.5 7.5 3.7-1.5 6.5-4 6.5-7.5"
          stroke="currentColor"
          strokeWidth="1.3"
        />
        <path d="M16 28h8M17.5 28v3h5v-3" stroke="currentColor" strokeWidth="1.25" />
        <path d="M15 31h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function BlessingsSection() {
  return (
    <section className="relative mx-auto mt-2 max-w-6xl px-4 sm:mt-4 sm:px-6 lg:px-8">
      <div className="relative border border-gold/45 px-3 py-10 sm:px-5 sm:py-12">
        <FiligreeCorner className="absolute left-1 top-1 text-gold sm:left-2 sm:top-2" />
        <FiligreeCorner className="absolute right-1 top-1 text-gold sm:right-2 sm:top-2" flipX />
        <FiligreeCorner className="absolute bottom-1 left-1 text-gold sm:bottom-2 sm:left-2" flipY />
        <FiligreeCorner
          className="absolute bottom-1 right-1 text-gold sm:bottom-2 sm:right-2"
          flipX
          flipY
        />

        <ul className="grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-9 lg:grid-cols-4 lg:gap-0">
          {BLESSINGS.map((item, index) => (
            <li key={item.title} className="relative px-3 text-center sm:px-4">
              {index > 0 ? (
                <span
                  aria-hidden
                  className="absolute left-0 top-1 hidden h-[calc(100%-0.5rem)] w-px bg-gold/40 lg:block"
                />
              ) : null}
              <div className="mx-auto flex justify-center text-gold">{item.icon}</div>
              <h3 className="mt-3.5 font-ceremony text-[0.7rem] tracking-[0.16em] text-maroon-deep uppercase">
                {item.title}
              </h3>
              <p className="mt-2 font-display text-[0.98rem] leading-relaxed text-[#5a4336]">
                {item.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
