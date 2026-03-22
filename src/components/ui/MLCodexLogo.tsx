interface MLCodexLogoProps {
  className?: string;
  size?: number;
  color?: string;
}

/**
 * MLCodex official logo — the geometric double-M lettermark.
 * A fully scalable SVG icon that adapts to any size and color via props.
 * Use `color="currentColor"` (default) to inherit from CSS text color.
 */
const MLCodexLogo = ({ className, size = 32, color = 'currentColor' }: MLCodexLogoProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="MLCodex logo"
    >
      {/*
        Outer M shape — large M letterform spanning the full width.
        The classic M: starts bottom-left, rises to top-left peak,
        dips to center valley, rises to top-right peak, descends to bottom-right.
      */}
      <polyline
        points="8,88 8,18 32,52 50,25 68,52 92,18 92,88"
        stroke={color}
        strokeWidth="7"
        strokeLinecap="square"
        strokeLinejoin="miter"
        fill="none"
      />

      {/*
        Inner inverted-M shape — sits inside the outer M, creating the
        double-M / stacked-M effect seen in the logo.
        Mirrors the outer M but inverted and inset.
      */}
      <polyline
        points="22,88 22,60 36,75 50,55 64,75 78,60 78,88"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="square"
        strokeLinejoin="miter"
        fill="none"
      />
    </svg>
  );
};

export default MLCodexLogo;
