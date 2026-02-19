
export enum ModulationMethod {
  Nullsystemfrei = 1,
  Raumzeiger = 2,
  Flattop120 = 3,
  Flattop60 = 4,
  Schoerner = 5,
  Manual = 6,
}

export enum PWMAlignment {
  Center = 'center',
  Edge = 'edge',
}

export interface SimulationConfig {
  phases: number; // 1 or 3
  showPhaseVoltages: boolean;
  showStarPoint: boolean;
  showSwitchingVectors: boolean;
  showTimeGraph: boolean;
  stepMode: boolean; // New discrete movement toggle
  modulationMethod: ModulationMethod;
  pwmAlignment: PWMAlignment;
  manualStarPoint: number; // 0-100
  amplitude: number; // 0-100
  frequency: number; // -100 to 100
}

export interface SimulationState {
  phase: number;
  xDeflection: number;
  prevXDeflection: number;
  us1: number;
  us2: number;
  us3: number;
  prevUs1: number;
  prevUs2: number;
  prevUs3: number;
  uStar: number;
  prevUStar: number;
  u10: number;
  u20: number;
  u30: number;
  prevU10: number;
  prevU20: number;
  prevU30: number;
  // SVM Animation State
  pwmTime: number; 
  sectorStartAngle: number;
  sectorEndAngle: number;
  flickerPhaseA: number; 
  flickerPhaseB: number; 
}
