import PageHeader from '../components/PageHeader';
import SimulatorApp from '../simulator/SimulatorApp';

export default function SimulatorPage() {
  return (
    <>
      <PageHeader
        tag="Interactive Tool"
        title="3-Phase PWM Simulator"
        description="Visualize space-vector modulation, phase voltages, hexagon trajectories, and PWM switching in real time. Adjust parameters and watch the 3D PMSM motor respond."
      />
      <section className="simulator-section">
        <div className="container">
          <SimulatorApp />
        </div>
      </section>
    </>
  );
}
