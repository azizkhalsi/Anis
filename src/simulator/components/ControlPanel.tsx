import React, { useCallback, useState, useRef, useEffect } from 'react';
import { ModulationMethod, PWMAlignment, SimulationConfig } from '../types';

interface ControlPanelProps {
  config: SimulationConfig;
  phaseOffset: number;
  setConfig: React.Dispatch<React.SetStateAction<SimulationConfig>>;
  setPhaseOffset: React.Dispatch<React.SetStateAction<number>>;
  phaseSliderRef: React.RefObject<HTMLInputElement>;
  onPhaseStart: () => void;
  isRunning: boolean;
  onStart: () => void;
  onStop: () => void;
  currentUStar: number;
}

const sliderClass = "sim-slider relative z-20 w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-500/30 transition-all";
const labelClass = "sim-label text-[11px] font-medium text-slate-600 tracking-wide mb-0.5 select-none cursor-help leading-none";
const valueClass = "sim-value relative z-10 text-[13px] font-medium tabular-nums text-slate-800 bg-white/90 px-1.5 py-0.5 rounded border border-slate-200/80 min-w-[36px] text-center select-none leading-none";
const sectionTitleClass = "sim-section-title text-xs font-semibold text-slate-800 uppercase tracking-widest border-l-2 border-red-600/80 bg-slate-50/90 pl-2.5 pr-2 py-1 rounded-r mb-2 select-none self-start flex items-center min-h-[22px] w-fit";
const columnClass = "flex flex-col px-4 sm:px-6 first:pl-0 last:pr-0 border-r border-slate-200/60 last:border-r-0 h-full w-full min-w-0";

interface TooltipState {
  text: string;
  x: number;
  y: number;
  visible: boolean;
  sourceKey?: string; 
}

const ActionButton: React.FC<{ active: boolean, label: string, onClick: () => void, colorClass: string, icon: React.ReactNode, onHover: (e: React.MouseEvent, text: string) => void, onLeave: () => void }> = ({ active, label, onClick, colorClass, icon, onHover, onLeave }) => (
    <button 
        type="button"
        onClick={onClick} 
        disabled={active} 
        onMouseEnter={(e) => onHover(e, label === 'START' ? 'Begin simulation' : 'Stop simulation')}
        onMouseLeave={onLeave}
        className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-md text-xs font-semibold tracking-wide min-h-[32px] transition-colors ${active ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-default' : `cursor-pointer border border-transparent ${colorClass} text-white hover:opacity-92 active:opacity-95`}`}
    >
        {icon}
        {label}
    </button>
);

const UnifiedControlBlock: React.FC<{ label: string, active: boolean, onClick: () => void, tooltipText: string, onHover: (e: React.MouseEvent, text: string, key?: string) => void, onLeave: () => void, tooltipKey?: string }> = ({ label, active, onClick, tooltipText, onHover, onLeave, tooltipKey }) => (
    <button 
      type="button"
      onClick={onClick}
      className={`sim-control-btn flex items-center justify-between w-full border rounded-md transition-colors min-h-[32px] px-2.5 py-1.5 gap-1.5 cursor-pointer bg-slate-50/80 border-slate-200 hover:border-slate-300 hover:bg-slate-100/80 ${active ? 'z-10' : ''}`}
    >
        <span 
          onMouseEnter={(e) => onHover(e, tooltipText, tooltipKey)}
          onMouseLeave={onLeave}
          className={`sim-control-label flex-1 min-w-0 text-left text-[11px] font-medium uppercase tracking-wide leading-tight text-ellipsis overflow-hidden cursor-pointer text-slate-600`}
        >
          {label}
        </span>
        <div className={`w-2 h-2 rounded-full border flex items-center justify-center shrink-0 transition-colors ${active ? 'border-red-500 bg-red-100' : 'border-slate-300 bg-slate-200/60'}`}>
           {active && <div className="w-1 h-1 bg-red-500 rounded-full"></div>}
        </div>
    </button>
);

export const ControlPanel: React.FC<ControlPanelProps> = ({ 
    config, phaseOffset, setConfig, setPhaseOffset, phaseSliderRef, onPhaseStart, isRunning, onStart, onStop, currentUStar 
}) => {
  const [tooltip, setTooltip] = useState<TooltipState>({ text: '', x: 0, y: 0, visible: false });
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (tooltip.visible && tooltip.sourceKey === 'voltages') {
      setTooltip(prev => ({
        ...prev,
        text: config.showPhaseVoltages ? "Works without limits" : "Has a limit (Clipping)"
      }));
    }
  }, [config.showPhaseVoltages, tooltip.visible, tooltip.sourceKey]);

  const handleMouseEnter = (e: React.MouseEvent, text: string, sourceKey?: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top - 10;
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setTooltip({ text, x, y, visible: true, sourceKey });
    }, 800); 
  };

  const handleMouseLeave = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setTooltip(prev => ({ ...prev, visible: false }));
  };

  const handleChange = useCallback(<K extends keyof SimulationConfig>(key: K, value: SimulationConfig[K]) => setConfig((prev) => ({ ...prev, [key]: value })), [setConfig]);
  
  const toggleStepMode = () => {
    const nextMode = !config.stepMode;
    setConfig(prev => {
        const updates: Partial<SimulationConfig> = { stepMode: nextMode };
        // If mode is activated while running, reset frequency to 0Hz
        if (nextMode && isRunning) {
            updates.frequency = 0;
        }
        return { ...prev, ...updates };
    });
  };

  const isManual = config.modulationMethod === ModulationMethod.Manual;
  const starPointValue = isManual ? config.manualStarPoint : Math.round(currentUStar);

  const parameters = [
    { label: 'Neutral Pt', val: starPointValue, key: 'manualStarPoint', min: 0, max: 100, readOnly: !isManual, tip: "Virtual ground potential offset" },
    { label: 'Amplitude', val: config.amplitude, key: 'amplitude', min: 0, max: 100, suffix: '%', tip: "Output magnitude scale" },
    { label: 'Frequency', val: config.frequency, key: 'frequency', min: -100, max: 100, suffix: 'Hz', readOnly: config.stepMode, tip: "Electrical cycle frequency" },
    { label: 'Angle', val: Math.round(phaseOffset), key: 'phase', min: 0, max: 360, step: config.stepMode ? 60 : 1, suffix: '°', customRef: phaseSliderRef, tip: "Phase offset angle" }
  ];

  const renderParameter = (p: typeof parameters[0], heightClass = "min-h-[30px]") => (
    <div key={p.key} className={`px-0 flex flex-col justify-center ${heightClass}`}>
      <div className="flex justify-between items-center mb-0.5">
        <label onMouseEnter={(e) => handleMouseEnter(e, p.tip)} onMouseLeave={handleMouseLeave} className={labelClass}>{p.label}</label>
        <span className={valueClass}>{p.val}{p.suffix || ''}</span>
      </div>
      <div className="h-1.5 flex items-center">
        <input 
          ref={p.customRef} type="range" min={p.min} max={p.max} value={p.val} step={p.step || 1}
          onPointerDown={() => { if(p.key === 'phase') onPhaseStart(); }}
          onChange={(e) => {
            if (p.key === 'phase') setPhaseOffset(parseInt(e.target.value));
            else if (!p.readOnly) handleChange(p.key as any, parseInt(e.target.value));
          }}
          className={`${sliderClass} ${p.readOnly ? 'opacity-30 cursor-not-allowed' : ''}`}/>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-2 w-full h-full relative">
      {/* Top Header Row */}
      <div className="flex flex-wrap justify-between items-center w-full gap-2 px-0 sm:px-1">
        <div className="flex gap-1.5 w-full max-w-[160px] sm:max-w-[140px] min-h-[32px]">
          <ActionButton active={isRunning} label="START" onClick={onStart} onHover={handleMouseEnter} onLeave={handleMouseLeave} colorClass="bg-emerald-600 border-emerald-700 hover:bg-emerald-500" icon={<svg width="6" height="8" viewBox="0 0 8 10" fill="currentColor"><path d="M0 0L8 5L0 10V0Z" /></svg>} />
          <ActionButton active={!isRunning} label="STOP" onClick={onStop} onHover={handleMouseEnter} onLeave={handleMouseLeave} colorClass="bg-rose-600 border-rose-700 hover:bg-rose-500" icon={<svg width="6" height="6" viewBox="0 0 8 8" fill="currentColor"><rect width="8" height="8" /></svg>} />
        </div>
        <div className="flex-1 flex justify-end items-center min-h-[32px] pl-4">
          <img src="/logo.png" alt="APPCON" className="h-7 w-auto max-w-[280px] object-contain mix-blend-multiply opacity-90" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-x-8 items-start overflow-visible w-full border-t border-slate-200/50 pt-3">
        {/* Column 1: System Control */}
        <div className={columnClass}>
          <h3 className={sectionTitleClass}>System Control</h3>
          <div className="grid grid-cols-2 gap-1.5">
            <UnifiedControlBlock label="1-Phase" active={config.phases === 1} onClick={() => handleChange('phases', 1)} onHover={handleMouseEnter} onLeave={handleMouseLeave} tooltipText="Single phase simulation" />
            <UnifiedControlBlock label="3-Phase" active={config.phases === 3} onClick={() => handleChange('phases', 3)} onHover={handleMouseEnter} onLeave={handleMouseLeave} tooltipText="Three phase simulation" />
            <UnifiedControlBlock label="Voltages" active={config.showPhaseVoltages} onClick={() => handleChange('showPhaseVoltages', !config.showPhaseVoltages)} onHover={handleMouseEnter} onLeave={handleMouseLeave} tooltipKey="voltages" tooltipText={config.showPhaseVoltages ? "Works without limits" : "Has a limit (Clipping)"} />
            <UnifiedControlBlock label="Neutral" active={config.showStarPoint} onClick={() => handleChange('showStarPoint', !config.showStarPoint)} onHover={handleMouseEnter} onLeave={handleMouseLeave} tooltipText="Display star point" />
            <UnifiedControlBlock label="SVM Vectors" active={config.showSwitchingVectors} onClick={() => handleChange('showSwitchingVectors', !config.showSwitchingVectors)} onHover={handleMouseEnter} onLeave={handleMouseLeave} tooltipText="Switching state vectors" />
            <UnifiedControlBlock label="X-Deflection" active={config.showTimeGraph} onClick={() => handleChange('showTimeGraph', !config.showTimeGraph)} onHover={handleMouseEnter} onLeave={handleMouseLeave} tooltipText="Time domain sweep" />
          </div>
        </div>

        {/* Column 2: Modulation Strategy & Alignment */}
        <div className={columnClass}>
          <h3 className={sectionTitleClass}>Modulation Strategy</h3>
          <div className="grid grid-cols-2 gap-1.5">
            {[
              { label: 'Sinusoidal', val: ModulationMethod.Nullsystemfrei, tip: "Traditional sinusoidal PWM" },
              { label: 'Space Vector', val: ModulationMethod.Raumzeiger, tip: "Space Vector Modulation" },
              { label: '120° Flat', val: ModulationMethod.Flattop120, tip: "Discontinuous PWM (120 deg)" },
              { label: '60° Flat', val: ModulationMethod.Flattop60, tip: "Discontinuous PWM (60 deg)" },
              { label: "Schoerner", val: ModulationMethod.Schoerner, tip: "Optimized overmodulation" },
              { label: 'Manual', val: ModulationMethod.Manual, tip: "Manual ground potential shift" },
            ].map((m) => (
              <UnifiedControlBlock key={m.val} label={m.label} active={config.modulationMethod === m.val} onClick={() => handleChange('modulationMethod', m.val)} onHover={handleMouseEnter} onLeave={handleMouseLeave} tooltipText={m.tip} />
            ))}
          </div>
          <div className="flex bg-slate-100/80 p-0.5 rounded-md border border-slate-200 min-h-[28px] mt-5 mb-6">
            <button type="button" onClick={() => handleChange('pwmAlignment', PWMAlignment.Center)} className={`flex-1 rounded text-[11px] font-medium transition-colors uppercase flex items-center justify-center min-h-[26px] cursor-pointer gap-1.5 text-slate-600 hover:text-slate-800 hover:bg-slate-200/50 ${config.pwmAlignment === PWMAlignment.Center ? 'bg-transparent' : ''}`}>
              {config.pwmAlignment === PWMAlignment.Center && <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" aria-hidden />}
              <span onMouseEnter={(e) => handleMouseEnter(e, "Center Aligned PWM Switching")} onMouseLeave={handleMouseLeave} className="cursor-help">Center</span>
            </button>
            <button type="button" onClick={() => handleChange('pwmAlignment', PWMAlignment.Edge)} className={`flex-1 rounded text-[11px] font-medium transition-colors uppercase flex items-center justify-center min-h-[26px] cursor-pointer gap-1.5 text-slate-600 hover:text-slate-800 hover:bg-slate-200/50 ${config.pwmAlignment === PWMAlignment.Edge ? 'bg-transparent' : ''}`}>
              {config.pwmAlignment === PWMAlignment.Edge && <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" aria-hidden />}
              <span onMouseEnter={(e) => handleMouseEnter(e, "Edge Aligned PWM Switching")} onMouseLeave={handleMouseLeave} className="cursor-help">Edge</span>
            </button>
          </div>
        </div>

        {/* Column 3: Machine Parameters */}
        <div className={columnClass}>
          <h3 className={sectionTitleClass}>Machine Parameters</h3>
          <div className="flex flex-col gap-0">
               {parameters.slice(0, 3).map(p => renderParameter(p, "min-h-[30px]"))}
               <div className="mt-0.5 min-h-[30px] flex flex-col justify-center">
                 <div className="flex justify-between items-end mb-0.5">
                    <div className="flex items-center gap-1.5">
                      <label onMouseEnter={(e) => handleMouseEnter(e, parameters[3].tip)} onMouseLeave={handleMouseLeave} className={labelClass}>{parameters[3].label}</label>
                      <button 
                        type="button"
                        onClick={toggleStepMode}
                        onMouseEnter={(e) => handleMouseEnter(e, "Select Sector")}
                        onMouseLeave={handleMouseLeave}
                        className={`cursor-pointer w-3 h-3 rounded-full border transition-all flex items-center justify-center ${config.stepMode ? 'bg-slate-600 border-slate-700' : 'bg-transparent border-slate-300 hover:border-slate-500'}`}
                        aria-label="Select Sector"
                      >
                        <div className={`w-0.5 h-0.5 rounded-full ${config.stepMode ? 'bg-white' : 'bg-transparent'}`}></div>
                      </button>
                    </div>
                    <span className={valueClass}>{parameters[3].val}{parameters[3].suffix || ''}</span>
                 </div>
                 <div className="h-1 flex items-center">
                   <input 
                     ref={parameters[3].customRef} type="range" min={parameters[3].min} max={parameters[3].max} value={parameters[3].val} step={parameters[3].step}
                     onPointerDown={() => { onPhaseStart(); }}
                     onChange={(e) => setPhaseOffset(parseInt(e.target.value))}
                     className={sliderClass}/>
                 </div>
               </div>
          </div>
        </div>
      </div>

      {tooltip.visible && (
        <div className="fixed z-[100] pointer-events-none" style={{ left: `${tooltip.x}px`, top: `${tooltip.y}px`, transform: 'translate(-50%, -100%)' }}>
          <div className="bg-slate-800/95 text-white text-xs font-medium py-1.5 px-3 rounded shadow-[0_4px_12px_rgba(0,0,0,0.4)] border border-slate-700/50 whitespace-nowrap flex items-center backdrop-blur-md">{tooltip.text}</div>
          <div className="w-1.5 h-1.5 bg-slate-800/95 border-r border-b border-slate-700/50 rotate-45 mx-auto -mt-1"></div>
        </div>
      )}
    </div>
  );
};