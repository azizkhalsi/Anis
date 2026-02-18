import PageHeader from '../components/PageHeader';
import Industries from '../components/Industries';

export default function IndustriesPage() {
  return (
    <>
      <PageHeader
        tag="Industries"
        title="Solutions Across Key Markets"
        description="We deliver motor control and power electronics solutions tailored to the demands of diverse industries worldwide."
      />
      <Industries />
    </>
  );
}
