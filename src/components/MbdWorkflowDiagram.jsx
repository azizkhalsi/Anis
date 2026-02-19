/**
 * Model-Based Design workflow: requirements → model → simulate → validate → code gen → integrate.
 * Clear, scalable diagram for the MBD expertise section.
 */
export default function MbdWorkflowDiagram() {
  const accent = '#c42b2b';
  const text = '#1a1a2e';
  const muted = '#6b6b7e';
  const stroke = '#e2e8f0';

  const steps = [
    { id: 'req', label: 'Requirements', sub: 'Specs & constraints' },
    { id: 'model', label: 'Model', sub: 'Controller design' },
    { id: 'sim', label: 'Simulate', sub: 'Validation' },
    { id: 'code', label: 'Code Gen', sub: 'Auto generation' },
    { id: 'integrate', label: 'Integrate', sub: 'Target software' },
  ];

  return (
    <svg
      viewBox="0 0 520 200"
      className="mbd-workflow-diagram"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Model-Based Design workflow: Requirements to Model, Simulation, Code Generation, Integration"
    >
      <defs>
        <linearGradient id="mbd-accent" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.15" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.05" />
        </linearGradient>
      </defs>
      {steps.map((step, i) => {
        const x = 24 + i * 100;
        const y = 40;
        const w = 84;
        const h = 100;
        const isCenter = i === 2;
        return (
          <g key={step.id}>
            <rect
              x={x}
              y={y}
              width={w}
              height={h}
              rx="10"
              fill={isCenter ? 'url(#mbd-accent)' : '#f8fafc'}
              stroke={isCenter ? accent : stroke}
              strokeWidth={isCenter ? 2 : 1}
            />
            <text x={x + w / 2} y={y + 38} textAnchor="middle" fill={text} fontFamily="system-ui, sans-serif" fontSize="12" fontWeight="600">
              {step.label}
            </text>
            <text x={x + w / 2} y={y + 56} textAnchor="middle" fill={muted} fontFamily="system-ui, sans-serif" fontSize="10">
              {step.sub}
            </text>
            {i < steps.length - 1 && (
              <g>
                <line x1={x + w + 2} y1={y + h / 2} x2={x + w + 98} y2={y + h / 2} stroke={accent} strokeWidth="2" />
                <path d={`M ${x + w + 90} ${y + h / 2 - 6} L ${x + w + 98} ${y + h / 2} L ${x + w + 90} ${y + h / 2 + 6} Z`} fill={accent} />
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}
