import { useParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Products from '../components/Products';
import { PRODUCTS } from '../components/Products';

const VALID_PRODUCTS = ['dmk', 'lci', 'amc'];

export default function ProductsPage() {
  const { productId } = useParams();
  const initialProduct = productId && VALID_PRODUCTS.includes(productId) ? productId : 'dmk';
  const product = PRODUCTS.find((p) => p.id === initialProduct);
  const title = product ? product.name : 'Products';
  const description = product ? product.hero : 'Innovative solutions for motor control.';

  return (
    <>
      <PageHeader
        tag="Products"
        title={title}
        description={description}
      />
      <Products initialProduct={initialProduct} singleMode />
    </>
  );
}
