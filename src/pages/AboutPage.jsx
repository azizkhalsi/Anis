import { useTranslation } from 'react-i18next';
import PageHeader from '../components/PageHeader';
import About from '../components/About';
import Leadership from '../components/Leadership';

export default function AboutPage() {
  const { t } = useTranslation();
  return (
    <>
      <PageHeader
        tag={t('about.pageTag')}
        title={t('about.pageTitle')}
        description={t('about.pageDescription')}
      />
      <About />
      <Leadership embedded />
    </>
  );
}
