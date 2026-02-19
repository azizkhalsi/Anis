import { useEffect, useRef, useCallback, useState } from 'react';

// Maps the 3-phase PWM simulation output (0–100 duty) into
// signed PWM values (-255 to 255) suitable for H-Bridge control.
// Connects to a Socket.io backend that relays data to an MCU over Serial/WS.

export interface HBridgeChannelData {
  pwm: number;       // 0–255 magnitude
  direction: boolean; // true = forward
}

export interface HBridgeFrame {
  ch1: HBridgeChannelData;
  ch2: HBridgeChannelData;
  ch3: HBridgeChannelData;
  eStop: boolean;
  timestamp: number;
}

export interface MotorFeedback {
  ch1_current: number;
  ch2_current: number;
  ch3_current: number;
  connected: boolean;
}

interface UseHBridgeExportOptions {
  serverUrl?: string;
  sampleRateMs?: number;
  enabled?: boolean;
}

function dutyToHBridge(duty: number): HBridgeChannelData {
  // duty is 0–100 from the simulation; centre is 50 = 0 torque
  const signed = ((duty - 50) / 50) * 255; // -255 to +255
  return {
    pwm: Math.min(255, Math.round(Math.abs(signed))),
    direction: signed >= 0,
  };
}

export function useHBridgeExport(
  u10: number,
  u20: number,
  u30: number,
  options: UseHBridgeExportOptions = {}
) {
  const { serverUrl = 'http://localhost:4000', sampleRateMs = 20, enabled = false } = options;
  const socketRef = useRef<WebSocket | null>(null);
  const [feedback, setFeedback] = useState<MotorFeedback>({ ch1_current: 0, ch2_current: 0, ch3_current: 0, connected: false });
  const [eStop, setEStop] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const latestValues = useRef({ u10, u20, u30 });
  latestValues.current = { u10, u20, u30 };

  const triggerEStop = useCallback(() => {
    setEStop(true);
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      const frame: HBridgeFrame = {
        ch1: { pwm: 0, direction: true },
        ch2: { pwm: 0, direction: true },
        ch3: { pwm: 0, direction: true },
        eStop: true,
        timestamp: Date.now(),
      };
      socketRef.current.send(JSON.stringify(frame));
    }
  }, []);

  const resetEStop = useCallback(() => setEStop(false), []);

  useEffect(() => {
    if (!enabled) return;

    let ws: WebSocket;
    try {
      ws = new WebSocket(serverUrl.replace('http', 'ws') + '/bridge');
    } catch {
      return;
    }
    socketRef.current = ws;

    ws.onopen = () => setFeedback(prev => ({ ...prev, connected: true }));
    ws.onclose = () => {
      setFeedback(prev => ({ ...prev, connected: false }));
      triggerEStop();
    };
    ws.onerror = () => { /* connection failed: silent, no browser console spam */ };
    ws.onmessage = (evt) => {
      try {
        const data = JSON.parse(evt.data);
        if (data.type === 'feedback') {
          setFeedback({ ch1_current: data.ch1_current, ch2_current: data.ch2_current, ch3_current: data.ch3_current, connected: true });
        }
      } catch { /* ignore parse errors */ }
    };

    intervalRef.current = setInterval(() => {
      if (ws.readyState !== WebSocket.OPEN || eStop) return;
      const { u10, u20, u30 } = latestValues.current;
      const frame: HBridgeFrame = {
        ch1: dutyToHBridge(u10),
        ch2: dutyToHBridge(u20),
        ch3: dutyToHBridge(u30),
        eStop: false,
        timestamp: Date.now(),
      };
      ws.send(JSON.stringify(frame));
    }, sampleRateMs);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      ws.close();
    };
  }, [enabled, serverUrl, sampleRateMs, eStop, triggerEStop]);

  const getFrame = useCallback((): HBridgeFrame => {
    const { u10, u20, u30 } = latestValues.current;
    return {
      ch1: dutyToHBridge(u10),
      ch2: dutyToHBridge(u20),
      ch3: dutyToHBridge(u30),
      eStop,
      timestamp: Date.now(),
    };
  }, [eStop]);

  return { feedback, eStop, triggerEStop, resetEStop, getFrame };
}
