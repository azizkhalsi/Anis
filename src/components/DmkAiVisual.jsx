/**
 * Animated AI-driven analysis visual: nodes, connections, and pulse.
 * Smooth, convincing, subtle animation for the Data Intelligence section.
 */
export default function DmkAiVisual() {
  return (
    <div className="dmk-ai-visual" aria-hidden>
      <svg
        className="dmk-ai-visual-svg"
        viewBox="0 0 400 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="dmk-ai-grad-accent" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--accent-light, #e04444)" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="dmk-ai-grad-glow" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
          <filter id="dmk-ai-glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="dmk-ai-soft">
            <feGaussianBlur stdDeviation="0.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Background grid */}
        <g className="dmk-ai-visual-grid">
          {[0, 1, 2, 3, 4].map((i) => (
            <line key={`v${i}`} x1={80 + i * 80} y1="20" x2={80 + i * 80} y2="200" className="dmk-ai-grid-line" />
          ))}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <line key={`h${i}`} x1="40" y1={20 + i * 36} x2="360" y2={20 + i * 36} className="dmk-ai-grid-line" />
          ))}
        </g>
        {/* Data flow lines (animated) */}
        <g className="dmk-ai-visual-flows">
          <path
            className="dmk-ai-flow dmk-ai-flow-1"
            d="M 80 110 Q 160 80 240 110 T 400 110"
            stroke="url(#dmk-ai-grad-accent)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            className="dmk-ai-flow dmk-ai-flow-2"
            d="M 80 130 Q 160 160 240 130 T 400 130"
            stroke="url(#dmk-ai-grad-accent)"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
            strokeOpacity="0.7"
          />
          <path
            className="dmk-ai-flow dmk-ai-flow-3"
            d="M 120 60 L 200 110 L 280 60"
            stroke="var(--accent)"
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
            strokeOpacity="0.5"
          />
        </g>
        {/* Nodes */}
        <g className="dmk-ai-visual-nodes">
          <circle cx="80" cy="110" r="12" className="dmk-ai-node dmk-ai-node--input" filter="url(#dmk-ai-glow)" />
          <circle cx="80" cy="130" r="10" className="dmk-ai-node dmk-ai-node--input" filter="url(#dmk-ai-glow)" />
          <circle cx="160" cy="95" r="8" className="dmk-ai-node dmk-ai-node--hidden" />
          <circle cx="200" cy="110" r="14" className="dmk-ai-node dmk-ai-node--core" filter="url(#dmk-ai-glow)" />
          <circle cx="240" cy="125" r="8" className="dmk-ai-node dmk-ai-node--hidden" />
          <circle cx="280" cy="60" r="8" className="dmk-ai-node dmk-ai-node--hidden" />
          <circle cx="320" cy="110" r="10" className="dmk-ai-node dmk-ai-node--output" filter="url(#dmk-ai-soft)" />
          <circle cx="360" cy="110" r="12" className="dmk-ai-node dmk-ai-node--output" filter="url(#dmk-ai-glow)" />
        </g>
        {/* Pulse ring on core (animated via scale) */}
        <circle cx="200" cy="110" r="14" className="dmk-ai-pulse" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
        {/* Labels */}
        <text x="72" y="208" className="dmk-ai-label">Data</text>
        <text x="368" y="208" className="dmk-ai-label">Insight</text>
      </svg>
    </div>
  );
}
