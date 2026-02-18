import PageHeader from '../components/PageHeader';
import Products from '../components/Products';

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        tag="Our Products"
        title="Innovative Solutions for Motor Control"
        description="Explore our flagship measurement tools, inverter hardware, and motor control software framework."
      />
      <Products />
    </>
  );
}
