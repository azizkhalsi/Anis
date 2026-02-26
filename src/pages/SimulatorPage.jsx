import { useTranslation } from 'react-i18next';
import PageHeader from '../components/PageHeader';
import SimulatorApp from '../simulator/SimulatorApp';

export default function SimulatorPage() {
  const { t } = useTranslation();
  return (
    <>
      <PageHeader
        tag={t('simulatorPage.tag')}
        title={t('simulatorPage.title')}
        description={t('simulatorPage.description')}
      />
      <section className="simulator-section">
        <div className="container">
          <SimulatorApp />
        </div>
      </section>
    </>
  );
}
