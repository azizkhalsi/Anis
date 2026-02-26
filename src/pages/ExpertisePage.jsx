import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageHeader from '../components/PageHeader';
import ExpertiseSingle from '../components/ExpertiseSingle';
import { TABS } from '../constants/expertiseTabs';

export default function ExpertisePage() {
  const { t } = useTranslation();
  const { topicId } = useParams();
  const tab = topicId ? TABS.find((tabItem) => tabItem.id === topicId) : null;
  const title = tab ? t(`expertise.tabs.${topicId}.label`) : t('nav.expertise');
  const description = tab
    ? t(`expertise.topicDescriptions.${topicId}`)
    : t('expertise.defaultDescription');

  return (
    <>
      <PageHeader
        tag={t('expertise.tag')}
        title={title}
        description={description}
      />
      <ExpertiseSingle />
    </>
  );
}
