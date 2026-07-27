interface LogoProps {
  className?: string;
}

/**
 * Malhotra Events brand mark — the gold "M" glyph used site-wide
 * (navbar, footer, achievement timeline, etc). Rendered as a real
 * .svg asset so it stays crisp at any size.
 */
export default function Logo({ className = 'h-10 w-10' }: LogoProps) {
  return (
    <img
      src="/logo.svg"
      alt="Malhotra Events"
      className={`${className} object-contain select-none`}
      draggable={false}
    />
  );
}
