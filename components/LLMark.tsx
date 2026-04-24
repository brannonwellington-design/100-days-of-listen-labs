type Props = {
  circleColor: string;
  glyphColor: string;
  size?: number;
};

// Listen Labs mark: a filled circle with an audio-wave glyph inside.
// circleColor should be the card's primary text color; glyphColor should be the card bg.
export function LLMark({ circleColor, glyphColor, size = 28 }: Props) {
  const stroke = Math.max(1, size / 14);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Listen Labs"
    >
      <circle cx="14" cy="14" r="14" fill={circleColor} />
      <g
        stroke={glyphColor}
        strokeWidth={stroke}
        strokeLinecap="round"
        fill="none"
      >
        <line x1="7" y1="14" x2="7" y2="14" />
        <line x1="10" y1="11" x2="10" y2="17" />
        <line x1="13" y1="8" x2="13" y2="20" />
        <line x1="16" y1="10" x2="16" y2="18" />
        <line x1="19" y1="12" x2="19" y2="16" />
        <line x1="22" y1="14" x2="22" y2="14" />
      </g>
    </svg>
  );
}
