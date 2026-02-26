export const PRODUCTS = [
  {
    id: 'dmk',
    name: 'DMK',
    tagline: 'Drive Measurement Kit',
    badge: 'Flagship Product',
    badgeClass: 'product-badge-flagship',
    hero: 'One instrument. Replaces your entire motor test bench.',
    description: [
      'The DMK is a compact and powerful measurement solution designed for inverter-driven motors. It precisely measures phase currents and PWM-voltages and perfectly synchronizes them to the rotor position, providing real-time visualization and data storage.',
      'With its integrated functionalities, DMK simplifies motor analysis, making it an essential tool for development, benchmarking and endurance tests. It replaces oscilloscope, current probes, data logger, and PWM monitoring equipment — saving cost, space, and engineering effort.',
    ],
    highlights: [
      { icon: 'scope', label: 'Replaces Oscilloscope', detail: '+ 3 current probes' },
      { icon: 'log', label: 'Data Logger', detail: 'Long-term recording' },
      { icon: 'pwm', label: 'PWM Monitor', detail: 'Typically $50k+ equipment' },
      { icon: 'rotor', label: 'Rotor Position', detail: 'Real-time measurement' },
    ],
    tags: ['Real-Time', 'Portable', 'USB-C', 'WiFi', 'Ethernet', 'Galvanic Isolation'],
  },
  {
    id: 'lci',
    name: 'LCI',
    tagline: 'Low-Cost Inverter',
    badge: 'Hardware',
    badgeClass: 'product-badge-hardware',
    hero: 'Production-ready inverter. Designed for millions.',
    description: [
      'Appcon Technologies is a leading inverter design house, offering cost-optimized solutions for Permanent Magnet Synchronous Motors (PMSM). Our robust, sensorless Field-Oriented Control (FOC) software and flexible inverter templates deliver exceptional performance and significant cost savings.',
      'We transform motors into intelligent units, reducing the need for additional sensors and further optimizing your system costs. Adaptable and scalable, our designs are ideal for household appliances, power tools, pumps, e-bikes, and any application needing efficient, cost-sensitive PMSM solutions. Partner with Appcon for accelerated development and reliable mass production.',
    ],
    highlights: [
      { icon: 'cost', label: 'Cost-Optimized', detail: 'High-volume ready' },
      { icon: 'motor', label: 'Sensorless FOC', detail: 'No encoder needed' },
      { icon: 'modular', label: 'Modular Design', detail: 'Adaptable platform' },
      { icon: 'compact', label: 'Compact', detail: 'Minimal footprint' },
    ],
    tags: ['PMSM', 'Sensorless FOC', 'Cost-Optimized', 'Household Appliances', 'Power Tools', 'E-Bikes'],
  },
  {
    id: 'amc',
    name: 'AMC',
    tagline: 'Appcon Motor Control',
    badge: 'Software',
    badgeClass: 'product-badge-software',
    hero: 'Plug-and-play motor control. Any motor. Any platform.',
    description: [
      'Appcon Motor Control (AMC) is a software-only control solution that saves the cost of a position sensor for any drive control application without compromising performance compared to sensored FOC. When AMC is integrated into drive software, it handles motor control and replaces the position sensor by calculating both motor speed and position.',
      'AMC is a plug-and-play solution that developers can seamlessly integrate into any drive software without requiring extensive knowledge in motor control.',
    ],
    highlights: [
      { icon: 'auto', label: 'AUTOSAR-Inspired', detail: 'Industry standard' },
      { icon: 'plug', label: 'Plug & Play', detail: 'Minimal integration' },
      { icon: 'sil', label: 'SiL Validated', detail: 'Production-ready' },
      { icon: 'all', label: 'All Motors', detail: 'PMSM, BLDC, Induction' },
    ],
    tags: ['AUTOSAR-Inspired', 'Plug & Play', 'SiL Validated', 'FOC', 'DTC', 'HF Injection'],
  },
];
