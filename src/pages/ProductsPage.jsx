import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageHeader from '../components/PageHeader';
import Products from '../components/Products';
import { PRODUCTS } from '../constants/productsData';

const VALID_PRODUCTS = ['dmk', 'lci', 'amc'];

export default function ProductsPage() {
  const { t } = useTranslation();
  const { productId } = useParams();
  const initialProduct = productId && VALID_PRODUCTS.includes(productId) ? productId : 'dmk';
  const product = PRODUCTS.find((p) => p.id === initialProduct);
  const title = product ? t(`products.${initialProduct}.name`) : t('products.pageTag');
  const description = product ? t(`products.${initialProduct}.hero`) : t('products.defaultDescription');

  return (
    <>
      <PageHeader
        tag={t('products.pageTag')}
        title={title}
        description={description}
      />
      <Products initialProduct={initialProduct} singleMode />
    </>
  );
}
