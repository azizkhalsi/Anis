/**
 * Comparison / "vs." content for Products section.
 * Structure supports i18n keys later (Part 2); values are plain text.
 */
export const PRODUCT_COMPARISONS = {
  dmk: {
    title: 'DMK vs. traditional test bench',
    leftLabel: 'Traditional setup',
    rightLabel: 'DMK',
    rows: [
      { left: 'Oscilloscope + current probes + data logger + PWM monitor + cabling', right: 'One instrument, same functions' },
      { left: 'High equipment cost ($50k+ typical)', right: 'Single unit, lower total cost' },
      { left: 'Multiple devices, large bench space', right: 'Compact, portable' },
      { left: 'Complex setup and synchronisation', right: 'Plug-and-play, integrated sync' },
    ],
  },
  amc: {
    title: 'AMC vs. sensored solution',
    leftLabel: 'Encoder-based FOC',
    rightLabel: 'AMC (sensorless)',
    rows: [
      { left: 'Position sensor (encoder/resolver) required', right: 'No sensor; motor acts as sensor' },
      { left: 'Additional hardware cost and wiring', right: 'Software-only, no extra hardware' },
      { left: 'Sensor reliability and environmental limits', right: 'Fewer failure points, robust' },
      { left: 'Performance depends on sensor quality', right: 'Performance parity with sensored FOC' },
    ],
  },
  lci: {
    title: 'LCI vs. custom design',
    leftLabel: 'In-house custom design',
    rightLabel: 'LCI (Appcon)',
    rows: [
      { left: 'Long development cycle, high NRE', right: 'Production-ready, faster time-to-market' },
      { left: 'Full design and validation in-house', right: 'Proven platform, cost-optimised' },
      { left: 'Ongoing maintenance and component obsolescence', right: 'Modular, scalable, supported' },
    ],
  },
};
