import { useTranslation } from 'react-i18next';
import PageHeader from '../components/PageHeader';
import EventHighlight from '../components/EventHighlight';

export default function EventsPage() {
  const { t } = useTranslation();
  return (
    <>
      <PageHeader
        tag={t('events.pageTag')}
        title={t('events.pageTitle')}
        description={t('events.pageDescription')}
      />
      <EventHighlight />
    </>
  );
}
