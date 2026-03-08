/**
 * Crisp SVG flowchart: MOTOR → DMK LOGGER → DATABASE → DETECTION → REPORT.
 * Light green cards, dark green outlines and text, dark background. Scalable.
 */
import { useTranslation } from 'react-i18next';

const CARD_W = 140;
const CARD_H = 72;
const GAP = 14;
const STROKE = 2;
const RAD = 10;

export default function DmkFlowchartSvg() {
  const { t } = useTranslation();
  const steps = [
    { key: 'flowMotor', icon: 'gear' },
    { key: 'flowDmkLogger', icon: 'wave' },
    { key: 'flowDatabase', icon: 'db' },
    { key: 'flowDetection', icon: 'detect' },
    { key: 'flowReport', icon: 'report' },
  ];
  const totalH = steps.length * (CARD_H + GAP) - GAP;
  const w = CARD_W + 48;
  const h = totalH + 32;

  return (
    <svg
      className="dmk-flowchart-svg"
      viewBox={`0 0 ${w} ${h}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="dmk-fc-bg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f5f6f7" />
        </linearGradient>
        <filter id="dmk-fc-shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.25" />
        </filter>
      </defs>
      <rect width={w} height={h} fill="url(#dmk-fc-bg)" rx="12" />
      {steps.map((step, i) => {
        const y = 16 + i * (CARD_H + GAP);
        const x = (w - CARD_W) / 2;
        const label = t(`products.dmk.dataIntel.${step.key}`);
        return (
          <g key={step.key}>
            {i > 0 && (
              <line
                x1={w / 2}
                y1={y - GAP}
                x2={w / 2}
                y2={y}
                stroke="#3d6b35"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
            <rect
              x={x}
              y={y}
              width={CARD_W}
              height={CARD_H}
              rx={RAD}
              fill="#b8e0b0"
              stroke="#2d5c27"
              strokeWidth={STROKE}
              filter="url(#dmk-fc-shadow)"
            />
            <g transform={`translate(${x + CARD_W / 2}, ${y + 26})`}>
              {step.icon === 'gear' && <GearIcon />}
              {step.icon === 'wave' && <WaveIcon />}
              {step.icon === 'db' && <DbIcon />}
              {step.icon === 'detect' && <DetectIcon />}
              {step.icon === 'report' && <ReportIcon />}
            </g>
            <text
              x={w / 2}
              y={y + CARD_H - 14}
              textAnchor="middle"
              className="dmk-flowchart-label"
              fill="#1a3d16"
            >
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function GearIcon() {
  return (
    <g fill="none" stroke="#2d5c27" strokeWidth="1.8" strokeLinecap="round" transform="scale(0.9) translate(-12,-12)">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v2m0 16v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M2 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      <path d="M12 5a7 7 0 0 0-7 7c0 1.5.5 3 1.2 4.2L12 12V5z" />
      <path d="M12 12l5.2 5.2A7 7 0 0 0 12 5v7z" />
    </g>
  );
}
function WaveIcon() {
  return (
    <g fill="none" stroke="#2d5c27" strokeWidth="1.8" strokeLinecap="round" transform="scale(0.85) translate(-12,-10)">
      <path d="M2 12h2l2-4 3 8 3-6 2 2h2" />
      <path d="M2 16h2l2-2 3 4 3-3 2 1h2" />
    </g>
  );
}
function DbIcon() {
  return (
    <g fill="none" stroke="#2d5c27" strokeWidth="1.8" strokeLinecap="round" transform="scale(0.9) translate(-12,-8)">
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6v12c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
      <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
    </g>
  );
}
function DetectIcon() {
  return (
    <g fill="none" stroke="#2d5c27" strokeWidth="2" strokeLinecap="round" transform="scale(0.8) translate(-12,-10)">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </g>
  );
}
function ReportIcon() {
  return (
    <g fill="none" stroke="#2d5c27" strokeWidth="1.8" strokeLinecap="round" transform="scale(0.85) translate(-12,-12)">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
      <path d="M10 9H8" />
    </g>
  );
}
