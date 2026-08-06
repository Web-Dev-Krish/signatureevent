interface LogoProps {
  className?: string;
}

/**
 * Malhotra Events brand mark — the PNG logo used site-wide
 * (navbar, footer, achievement timeline, etc).
 */
export default function Logo({ className = 'h-10 w-10' }: LogoProps) {
  return (
    <img
      src="/logo.png"
      alt="Malhotra Events"
      className={`${className} object-contain select-none`}
      draggable={false}
    />
  );
}
