import PageHeader from '../components/PageHeader';
import About from '../components/About';

export default function AboutPage() {
  return (
    <>
      <PageHeader
        tag="About Us"
        title="Pioneering Sensorless Motor Control"
        description="Founded in 2004, Appcon Technologies is an R&D engineering firm specializing in sensorless control of electrical motors and power electronics."
      />
      <About />
    </>
  );
}
