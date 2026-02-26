import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ControlPanel } from './components/ControlPanel';
import { ModulationMethod, PWMAlignment, SimulationConfig, SimulationState } from './types';
import MotorScene from './components/3d/MotorScene';
import './simulator.css';

const BASE_CANVAS_SIZE = 512; 
const GRAPH_LIMIT = BASE_CANVAS_SIZE * 0.45; 
const PI = Math.PI;
const HEX_RADIUS = BASE_CANVAS_SIZE * 0.38;

const INITIAL_CONFIG: SimulationConfig = {
  phases: 3,
  showPhaseVoltages: true,
  showStarPoint: true,
  showSwitchingVectors: false,
  showTimeGraph: true,
  stepMode: false,
  modulationMethod: ModulationMethod.Nullsystemfrei,
  pwmAlignment: PWMAlignment.Center,
  manualStarPoint: 50,
  amplitude: 50,
  frequency: 5,
};

const INITIAL_STATE: SimulationState = {
  phase: 0,
  xDeflection: 0,
  prevXDeflection: 0,
  us1: 0, us2: 0, us3: 0,
  prevUs1: 0, prevUs2: 0, prevUs3: 0,
  uStar: 50,
  prevUStar: 50,
  u10: 0, u20: 0, u30: 0,
  prevU10: 0, prevU20: 0, prevU30: 0,
  pwmTime: 0,
  sectorStartAngle: 0,
  sectorEndAngle: 60,
  flickerPhaseA: 0,
  flickerPhaseB: 0,
};

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

const App: React.FC = () => {
  const [config, setConfig] = useState<SimulationConfig>(INITIAL_CONFIG);
  const [phaseOffset, setPhaseOffset] = useState(0); 
  const [isRunning, setIsRunning] = useState(false);
  const [currentUStar, setCurrentUStar] = useState(INITIAL_STATE.uStar);

  // Live values for the 3D motor (refs to avoid re-renders every frame)
  const motorDataRef = useRef({ angle: 0, phaseVoltages: [0, 0, 0] as [number, number, number] });

  const [showMotor, setShowMotor] = useState(true);

  const onStart = () => setIsRunning(true);
  const onStop = () => setIsRunning(false);
  const onPhaseStart = () => { isDraggingPhase.current = true; };

  const dreibeinGridRef = useRef<HTMLCanvasElement>(null); 
  const dreibeinGraphRef = useRef<HTMLCanvasElement>(null); 
  const dreibeinVectorRef = useRef<HTMLCanvasElement>(null); 
  const sechseckRef = useRef<HTMLCanvasElement>(null);
  const pwmRef = useRef<HTMLCanvasElement>(null);

  const phaseSliderRef = useRef<HTMLInputElement>(null);
  const isDraggingPhase = useRef(false);
  const requestRef = useRef<number>(0);
  const simState = useRef<SimulationState>({ ...INITIAL_STATE });
  const configRef = useRef<SimulationConfig>(config);
  
  const realPhys = useRef({
      u10_real: 50, u20_real: 50, u30_real: 50,
      us1_real: 0, us2_real: 0, us3_real: 0,
      uStar_real: 50,
      prevU10_real: 50, prevU20_real: 50, prevU30_real: 50,
      prevUs1_real: 0, prevUs2_real: 0, prevUs3_real: 0,
      prevUStar_real: 50,
  });

  useEffect(() => { 
    if (config.stepMode && !configRef.current.stepMode) {
      const snapped = Math.round(simState.current.phase / 60) * 60;
      simState.current.phase = snapped;
      setPhaseOffset(snapped);
    }
    configRef.current = config; 
  }, [config]);

  const calculateSystemVoltages = (phase: number, cfg: SimulationConfig) => {
    const rad = (deg: number) => deg * PI / 180;
    const uAmplitude = (cfg.amplitude * 2) / 3;
    const s1 = uAmplitude * Math.cos(rad(phase));
    const s2 = uAmplitude * Math.cos(rad(phase - 120));
    const s3 = uAmplitude * Math.cos(rad(phase - 240));
    const usmax = Math.max(s1, s2, s3);
    const usmin = Math.min(s1, s2, s3);
    let uStar = 50;
    switch (cfg.modulationMethod) {
        case ModulationMethod.Nullsystemfrei: uStar = 50; break;
        case ModulationMethod.Raumzeiger: uStar = 50 - 0.5 * (usmax + usmin); break;
        case ModulationMethod.Flattop120: uStar = -usmin; break;
        case ModulationMethod.Flattop60: uStar = usmax > (0 - usmin) ? 100 - usmax : 0 - usmin; break;
        case ModulationMethod.Schoerner: 
            const offsetS = (uAmplitude / Math.sqrt(3)) * 1.5;
            uStar = (usmax + usmin) > 0 ? 50 + offsetS - usmax : 50 - offsetS - usmin; break;
        case ModulationMethod.Manual: uStar = cfg.manualStarPoint; break;
    }
    const u10 = s1 + uStar; const u20 = s2 + uStar; const u30 = s3 + uStar;
    const u10_real = clamp(u10, 0, 100); const u20_real = clamp(u20, 0, 100); const u30_real = clamp(u30, 0, 100);
    const uStar_real = (u10_real + u20_real + u30_real) / 3;
    const us1_real = u10_real - uStar_real; const us2_real = u20_real - uStar_real; const us3_real = u30_real - uStar_real;
    return { uStar, u10, u20, u30, u10_real, u20_real, u30_real, uStar_real, us1_real, us2_real, us3_real };
  };

  const drawStaticGrid = (ctx: CanvasRenderingContext2D, showPhaseVoltages: boolean) => {
    const h = BASE_CANVAS_SIZE; const w = BASE_CANVAS_SIZE;
    ctx.setLineDash([]); ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(0, h * 0.06); ctx.lineTo(w, h * 0.06); ctx.stroke(); 
    ctx.beginPath(); ctx.moveTo(0, h * 0.40); ctx.lineTo(w, h * 0.40); ctx.stroke(); 
    const botTopY = h * 0.56; const botMidY = h * 0.73; const botBottomY = h * 0.90;
    const horizontalAxisY = showPhaseVoltages ? botMidY : botBottomY;
    ctx.beginPath(); ctx.moveTo(0, horizontalAxisY); ctx.lineTo(w, horizontalAxisY); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(w / 2, botTopY - 25); ctx.lineTo(w / 2, botBottomY + 25); ctx.stroke();
    ctx.strokeStyle = 'rgba(128, 128, 128, 0.15)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(0, h); ctx.lineTo(w, h); ctx.stroke();
  };

  useEffect(() => {
    const ctxGrid = dreibeinGridRef.current?.getContext('2d');
    if (ctxGrid) {
        ctxGrid.fillStyle = 'black';
        ctxGrid.fillRect(0, 0, BASE_CANVAS_SIZE, BASE_CANVAS_SIZE);
        drawStaticGrid(ctxGrid, config.showPhaseVoltages);
    }
  }, [config.showPhaseVoltages]);

  const drawVector = (ctx: CanvasRenderingContext2D, ampl: number, phas: number, x: number, y: number, color: string, width: number = 4, arrowSize: number = 12, alpha: number = 1.0) => {
    const rad = (phas * PI) / 180; const len = (GRAPH_LIMIT * ampl) / 100;
    const endX = x + len * Math.cos(rad); const endY = y - len * Math.sin(rad);
    ctx.save(); ctx.globalAlpha = alpha; ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = width; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(endX, endY); ctx.stroke();
    if (arrowSize > 0 && Math.abs(ampl) > 0.1) {
        const angle = Math.atan2(endY - y, endX - x);
        ctx.beginPath(); ctx.moveTo(endX, endY);
        ctx.lineTo(endX - arrowSize * Math.cos(angle - PI / 6), endY - arrowSize * Math.sin(angle - PI / 6));
        ctx.moveTo(endX, endY);
        ctx.lineTo(endX - arrowSize * Math.cos(angle + PI / 6), endY - arrowSize * Math.sin(angle + PI / 6));
        ctx.stroke();
    }
    ctx.restore();
  };

  const drawSechseckBackground = (ctx: CanvasRenderingContext2D) => {
    const cx = BASE_CANVAS_SIZE / 2; const cy = BASE_CANVAS_SIZE / 2; const r = HEX_RADIUS;
    ctx.fillStyle = 'black'; ctx.fillRect(0, 0, BASE_CANVAS_SIZE, BASE_CANVAS_SIZE);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(BASE_CANVAS_SIZE, cy);
    ctx.moveTo(cx, 0); ctx.lineTo(cx, BASE_CANVAS_SIZE); ctx.stroke();
    ctx.strokeStyle = '#4c1d95'; ctx.lineWidth = 4;
    ctx.beginPath();
    for (let i = 0; i <= 6; i++) {
      const angle = (i * 60 * PI) / 180;
      const x = cx + r * Math.cos(angle); const y = cy - r * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.closePath(); ctx.stroke();
  };

  const drawPWMBackground = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = 'black'; ctx.fillRect(0, 0, BASE_CANVAS_SIZE, BASE_CANVAS_SIZE);
    const h = BASE_CANVAS_SIZE; const w = BASE_CANVAS_SIZE;
    const xStart = w * 0.1; const tpwm = w * 0.8;
    ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 4;
    [7/20, 12/20, 17/20].forEach(row => {
        const y = h * row; const piltH = h * 0.15;
        ctx.beginPath(); ctx.moveTo(xStart, y); ctx.lineTo(xStart + tpwm, y); ctx.stroke();
        ctx.save(); ctx.setLineDash([5, 5]); ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(xStart, y - piltH); ctx.lineTo(xStart + tpwm, y - piltH); ctx.stroke();
        ctx.restore();
    });
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(w / 2, h * 0.1); ctx.lineTo(w / 2, h * 0.9); ctx.stroke();
  };

  const stepPhysicsAndGraph = (dtPhase: number, dtX: number) => {
      const state = simState.current; const real = realPhys.current;
      const cfg = configRef.current; const ctxGraph = dreibeinGraphRef.current?.getContext('2d');
      real.prevU10_real = real.u10_real; real.prevU20_real = real.u20_real; real.prevU30_real = real.u30_real;
      real.prevUs1_real = real.us1_real; real.prevUs2_real = real.us2_real; real.prevUs3_real = real.us3_real;
      real.prevUStar_real = real.uStar_real;
      state.prevUs1 = state.us1; state.prevUs2 = state.us2; state.prevUs3 = state.us3;
      state.prevUStar = state.uStar; state.prevXDeflection = state.xDeflection;
      state.prevU10 = state.u10; state.prevU20 = state.u20; state.prevU30 = state.u30;
      state.phase += dtPhase;
      if (state.phase > 360) state.phase -= 360; 
      if (state.phase < 0) state.phase += 360;
      state.flickerPhaseA = (state.flickerPhaseA + 0.15) % 1.0;
      state.flickerPhaseB = (state.flickerPhaseB + 0.15) % 1.0;
      if (cfg.showTimeGraph) {
          state.xDeflection += dtX; if (state.xDeflection > BASE_CANVAS_SIZE) state.xDeflection = 0;
      }
      const effectivePhase = cfg.stepMode ? Math.round(state.phase / 60) * 60 : state.phase;
      const v = calculateSystemVoltages(effectivePhase, cfg);
      state.uStar = v.uStar; state.u10 = v.u10; state.u20 = v.u20; state.u30 = v.u30;
      real.u10_real = v.u10_real; real.u20_real = v.u20_real; real.u30_real = v.u30_real;
      real.uStar_real = v.uStar_real; real.us1_real = v.us1_real; real.us2_real = v.us2_real; real.us3_real = v.us3_real;
      
      if (ctxGraph && cfg.showTimeGraph) {
         if (state.xDeflection < state.prevXDeflection) {
             ctxGraph.clearRect(0, 0, BASE_CANVAS_SIZE, BASE_CANVAS_SIZE);
         } else {
             const drawL = (y1: number, y2: number, col: string, w = 4) => {
                ctxGraph.strokeStyle = col; ctxGraph.lineWidth = w;
                ctxGraph.beginPath(); ctxGraph.moveTo(state.prevXDeflection, y1);
                ctxGraph.lineTo(state.xDeflection, y2); ctxGraph.stroke();
             };
             const ud = BASE_CANVAS_SIZE * 0.34; const udminus = BASE_CANVAS_SIZE * 0.40; 
             const cTopY = (val: number) => udminus - (val * ud / 100);
             if (cfg.showStarPoint) drawL(cTopY(state.prevUStar), cTopY(state.uStar), 'white', 2);
             drawL(cTopY(state.prevU10), cTopY(state.u10), 'yellow', 4);
             if (cfg.phases === 3) { drawL(cTopY(state.prevU20), cTopY(state.u20), 'red', 4); drawL(cTopY(state.prevU30), cTopY(state.u30), 'green', 4); }
             const botMidY = BASE_CANVAS_SIZE * 0.73; 
             if (cfg.showPhaseVoltages) {
                 const scale = (BASE_CANVAS_SIZE * 0.25) / 100;
                 const getPlottedY = (val: number) => botMidY - (val * scale);
                 if (cfg.showStarPoint) drawL(getPlottedY(0), getPlottedY(0), 'white', 2);
                 drawL(getPlottedY(real.prevUs1_real), getPlottedY(real.us1_real), 'yellow', 4);
                 if (cfg.phases === 3) { drawL(getPlottedY(real.prevUs2_real), getPlottedY(real.us2_real), 'red', 4); drawL(getPlottedY(real.prevUs3_real), getPlottedY(real.us3_real), 'green', 4); }
             } else {
                 const botH = botMidY - BASE_CANVAS_SIZE * 0.56; const A_pot_scaled = botH;
                 const getPlottedPotY = (val: number) => botMidY - (2 * val * botH / 100 - A_pot_scaled);
                 if (cfg.showStarPoint) drawL(getPlottedPotY(real.prevUStar_real), getPlottedPotY(real.uStar_real), 'white', 2);
                 drawL(getPlottedPotY(real.prevU10_real), getPlottedPotY(real.u10_real), 'yellow', 4);
                 if (cfg.phases === 3) { drawL(getPlottedPotY(real.prevU20_real), getPlottedPotY(real.u20_real), 'red', 4); drawL(getPlottedPotY(real.prevU30_real), getPlottedPotY(real.u30_real), 'green', 4); }
             }
         }
      }
  };

  const renderVisuals = (renderPhase: number) => {
      const state = simState.current; const cfg = configRef.current;
      const effectivePhase = cfg.stepMode ? Math.round(renderPhase / 60) * 60 : renderPhase;
      const instant = calculateSystemVoltages(effectivePhase, cfg);
      
      const ctxVector = dreibeinVectorRef.current?.getContext('2d');
      if (ctxVector) {
          ctxVector.clearRect(0, 0, BASE_CANVAS_SIZE, BASE_CANVAS_SIZE);
          const ud = BASE_CANVAS_SIZE * 0.34; const udminus = BASE_CANVAS_SIZE * 0.40; 
          const centerY = udminus - (instant.uStar * ud / 100);
          const uAmplitude = (cfg.amplitude * 2) / 3; const vectorSize = (uAmplitude * ud) / GRAPH_LIMIT;
          drawVector(ctxVector, vectorSize, effectivePhase + 90, state.xDeflection, centerY, 'yellow', 4, 12);
          drawVector(ctxVector, vectorSize, effectivePhase - 30, state.xDeflection, centerY, 'red', 4, 12);
          drawVector(ctxVector, vectorSize, effectivePhase - 150, state.xDeflection, centerY, 'green', 4, 12);
      }
      const ctxHex = sechseckRef.current?.getContext('2d');
      if (ctxHex) {
          drawSechseckBackground(ctxHex);
          const cx = BASE_CANVAS_SIZE / 2; const cy = BASE_CANVAS_SIZE / 2;
          const angleDegNormalized = ((renderPhase % 360) + 360) % 360;
          const angleRad = (angleDegNormalized * PI) / 180;
          
          const isSaturated = instant.u10 > 100 || instant.u10 < 0 || 
                             instant.u20 > 100 || instant.u20 < 0 || 
                             instant.u30 > 100 || instant.u30 < 0;

          const inscribedRadius = HEX_RADIUS * Math.cos(PI / 6);
          const thetaMod = (angleRad % (PI / 3) + (PI / 3)) % (PI / 3) - (PI / 6);
          const localHexLimit = inscribedRadius / Math.cos(thetaMod);
          
          const uAmplitude = (cfg.amplitude * 2) / 3;
          const idealRadius = (uAmplitude / 66.6) * HEX_RADIUS; 
          const actualRadius = Math.min(idealRadius, localHexLimit);
          
          const WHITE_SCALE = (actualRadius / GRAPH_LIMIT) * 100;
          const IDEAL_SCALE = (idealRadius / GRAPH_LIMIT) * 100;

          if (cfg.showSwitchingVectors) {
              const sector = Math.floor(angleDegNormalized / 60) % 6;
              const angleV1_rad = (sector * 60 * PI) / 180; const angleV2_rad = ((sector + 1) * 60 * PI) / 180;
              const thetaSector = (angleDegNormalized % 60) * PI / 180; 
              const r1 = actualRadius * Math.sin(PI / 3 - thetaSector) / Math.sin(PI / 3);
              const r2 = actualRadius * Math.sin(thetaSector) / Math.sin(PI / 3);
              const m_current = actualRadius / inscribedRadius;
              const d1 = m_current * Math.sin(PI / 3 - thetaSector) / Math.sin(PI / 3);
              const d2 = m_current * Math.sin(thetaSector) / Math.sin(PI / 3);
              const fA = state.flickerPhaseA < d1 ? 1.0 : 0.08; const fB = state.flickerPhaseB < d2 ? 1.0 : 0.08;
              const VERTEX_SCALE = (HEX_RADIUS / GRAPH_LIMIT) * 100;
              const p1x = cx + r1 * Math.cos(angleV1_rad); const p1y = cy - r1 * Math.sin(angleV1_rad);
              const p2x = cx + r2 * Math.cos(angleV2_rad); const p2y = cy - r2 * Math.sin(angleV2_rad);
              const endX = cx + actualRadius * Math.cos(angleRad); const endY = cy - actualRadius * Math.sin(angleRad);
              drawVector(ctxHex, VERTEX_SCALE, sector * 60, cx, cy, '#a78bfa', 4, 12, fA);
              drawVector(ctxHex, VERTEX_SCALE, (sector + 1) * 60, cx, cy, '#a78bfa', 4, 12, fB);
              ctxHex.setLineDash([4, 6]); ctxHex.strokeStyle = 'rgba(167, 139, 250, 0.6)'; ctxHex.lineWidth = 2;
              ctxHex.beginPath(); ctxHex.moveTo(p1x, p1y); ctxHex.lineTo(endX, endY); ctxHex.moveTo(p2x, p2y); ctxHex.lineTo(endX, endY); ctxHex.stroke(); ctxHex.setLineDash([]);
          }

          if (isSaturated) {
              drawVector(ctxHex, IDEAL_SCALE, effectivePhase, cx, cy, 'red', 4, 12, 0.7);
          }
          
          drawVector(ctxHex, WHITE_SCALE, effectivePhase, cx, cy, '#e5e7eb', 4, 12, 1.0);
      }
      const ctxPWM = pwmRef.current?.getContext('2d');
      if (ctxPWM) {
          drawPWMBackground(ctxPWM);
          const drawPulse = (uVal: number, yBase: number, color: string) => {
             const tpwm = BASE_CANVAS_SIZE * 0.8; const xStart = BASE_CANVAS_SIZE * 0.1; const piltH = BASE_CANVAS_SIZE * 0.15;
             const duty = clamp(uVal, 0, 100) / 100; const pulseWidth = duty * tpwm;
             let tx = cfg.pwmAlignment === PWMAlignment.Center ? xStart + (tpwm - pulseWidth) / 2 : xStart;
             ctxPWM.strokeStyle = color; 
             ctxPWM.lineWidth = 2; 
             ctxPWM.beginPath();
             if (uVal <= 0) { ctxPWM.moveTo(xStart, yBase); ctxPWM.lineTo(xStart + tpwm, yBase); }
             else if (uVal >= 100) { ctxPWM.moveTo(xStart, yBase - piltH); ctxPWM.lineTo(xStart + tpwm, yBase - piltH); }
             else { ctxPWM.moveTo(xStart, yBase); ctxPWM.lineTo(tx, yBase); ctxPWM.lineTo(tx, yBase - piltH); ctxPWM.lineTo(tx + pulseWidth, yBase - piltH); ctxPWM.lineTo(tx + pulseWidth, yBase); ctxPWM.lineTo(xStart + tpwm, yBase); }
             ctxPWM.stroke();
          };
          drawPulse(instant.u10, BASE_CANVAS_SIZE * 7 / 20, 'yellow');
          drawPulse(instant.u20, BASE_CANVAS_SIZE * 12 / 20, 'red');
          drawPulse(instant.u30, BASE_CANVAS_SIZE * 17 / 20, 'green');
      }

      // Push values to 3D motor (via ref — no React re-render)
      motorDataRef.current.angle = effectivePhase;
      motorDataRef.current.phaseVoltages = [instant.us1_real, instant.us2_real, instant.us3_real];
  };

  const loop = useCallback(() => {
      const cfg = configRef.current; const state = simState.current;
      if (isRunning) {
        const tP = cfg.frequency * 0.15; const tX = (0.8 + Math.abs(cfg.frequency) * 0.045);
        const steps = Math.max(1, Math.ceil(Math.abs(tP) / 2.0)); 
        for (let i = 0; i < steps; i++) stepPhysicsAndGraph(tP / steps, tX / steps);
      }
      let displayPhase = state.phase;
      if (isDraggingPhase.current && phaseSliderRef.current) {
        displayPhase = parseInt(phaseSliderRef.current.value);
        state.phase = displayPhase;
        if (!isRunning) { stepPhysicsAndGraph(0, 0); }
      }
      renderVisuals(displayPhase); setCurrentUStar(state.uStar); setPhaseOffset(displayPhase);
      if (phaseSliderRef.current && !isDraggingPhase.current) {
        phaseSliderRef.current.value = Math.round(state.phase).toString();
      }
      requestRef.current = requestAnimationFrame(loop);
  }, [isRunning]);

  useEffect(() => {
      const handleUP = () => { isDraggingPhase.current = false; };
      window.addEventListener('pointerup', handleUP); requestRef.current = requestAnimationFrame(loop);
      return () => { window.removeEventListener('pointerup', handleUP); if (requestRef.current) cancelAnimationFrame(requestRef.current); };
  }, [loop]);

  return (
    <div className="sim-root font-sans overflow-x-hidden w-full">
      <main className="sim-main flex flex-col items-center py-1.5 px-3 sm:px-4 md:px-5">
        <div className="sim-content-wrap flex flex-col gap-2.5">
          {/* Row 1: 3 signal graphs aligned horizontally */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1.5 sm:gap-2 w-full shrink-0">
            <div className="bg-black border border-slate-800 shadow-sm relative rounded-lg aspect-square overflow-hidden">
              <canvas ref={dreibeinGridRef} width={BASE_CANVAS_SIZE} height={BASE_CANVAS_SIZE} className="absolute top-0 left-0 w-full h-full z-0"/>
              <canvas ref={dreibeinGraphRef} width={BASE_CANVAS_SIZE} height={BASE_CANVAS_SIZE} className="absolute top-0 left-0 w-full h-full z-10"/>
              <canvas ref={dreibeinVectorRef} width={BASE_CANVAS_SIZE} height={BASE_CANVAS_SIZE} className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none"/>
            </div>
            <div className="bg-black border border-slate-800 shadow-sm rounded-lg aspect-square overflow-hidden">
              <canvas ref={sechseckRef} width={BASE_CANVAS_SIZE} height={BASE_CANVAS_SIZE} className="w-full h-full" />
            </div>
            <div className="bg-black border border-slate-800 shadow-sm rounded-lg aspect-square overflow-hidden">
              <canvas ref={pwmRef} width={BASE_CANVAS_SIZE} height={BASE_CANVAS_SIZE} className="w-full h-full" />
            </div>
          </div>

          {/* Row 2: Control panel + optional 3D Motor (or "Show motor" button on the right) */}
          <div className="flex flex-col md:flex-row gap-2.5 w-full items-start transition-all duration-300">
            <div className="w-full min-w-0 flex-1">
              <ControlPanel
                config={config}
                phaseOffset={phaseOffset}
                setConfig={setConfig}
                setPhaseOffset={setPhaseOffset}
                phaseSliderRef={phaseSliderRef}
                onPhaseStart={onPhaseStart}
                isRunning={isRunning}
                onStart={onStart}
                onStop={onStop}
                currentUStar={currentUStar}
              />
            </div>
            {showMotor ? (
              <div className="sim-motor-wrap relative bg-transparent border border-slate-300/60 shadow-[0_0_16px_rgba(0,0,0,0.06)] rounded-xl overflow-hidden aspect-square w-full shrink-0 animate-[fadeIn_0.3s_ease-out]">
                <div className="absolute top-2 left-2.5 z-10">
                  <span className="text-[9px] font-semibold text-slate-600 uppercase tracking-wider bg-white/80 px-2 py-0.5 rounded-md backdrop-blur-sm border border-slate-200/60">3-Phase PMSM · Interactive</span>
                </div>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 text-[10px] font-medium text-slate-600 bg-white/90 px-2.5 py-1.5 rounded-lg shadow-sm border border-slate-200/70 backdrop-blur-sm pointer-events-none animate-[fadeIn_0.4s_ease-out] sim-motor-scroll-hint">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M5 9l-3 3 3 3M9 5l3-3 3 3M15 19l-3 3-3-3M19 9l3 3-3 3" />
                  </svg>
                  <span>Drag to rotate · Scroll to zoom</span>
                </div>
                <button
                  onClick={() => setShowMotor(false)}
                  className="absolute top-2 right-2.5 z-10 w-5 h-5 flex items-center justify-center rounded-full bg-white/80 hover:bg-red-500/90 border border-slate-300/60 hover:border-red-400 text-slate-500 hover:text-white text-[10px] leading-none transition-all duration-150 backdrop-blur-sm cursor-pointer"
                  title="Hide 3D motor"
                >
                  ✕
                </button>
                <MotorScene
                  motorDataRef={motorDataRef}
                  amplitude={config.amplitude}
                  isRunning={isRunning}
                />
              </div>
            ) : (
              <button
                onClick={() => setShowMotor(true)}
                type="button"
                className="hidden md:flex items-center gap-1.5 self-start ml-auto px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium tracking-wide transition-all duration-200 shadow hover:shadow-md border border-slate-600/50 cursor-pointer"
                title="Open 3D motor visualization"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                  <line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
                Show 3D Motor
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
