export function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        cx="32"
        cy="32"
        rx="28"
        ry="11"
        stroke="url(#orbitGradient)"
        strokeWidth="1.4"
        transform="rotate(-18 32 32)"
        opacity="0.85"
      />
      <circle cx="32" cy="32" r="17" fill="var(--color-background)" stroke="url(#orbitGradient)" strokeWidth="2" />
      <path
        d="M25 27L19 32L25 37"
        stroke="var(--color-primary)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M39 27L45 32L39 37"
        stroke="var(--color-primary)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M34.5 24L29.5 40" stroke="var(--color-primary)" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="55" cy="14" r="2.6" fill="var(--color-primary-soft)" />
      <circle cx="10" cy="49" r="2" fill="var(--color-accent)" />
      <defs>
        <linearGradient id="orbitGradient" x1="4" y1="32" x2="60" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--color-accent)" />
          <stop offset="1" stopColor="var(--color-primary)" />
        </linearGradient>
      </defs>
    </svg>
  );
}
