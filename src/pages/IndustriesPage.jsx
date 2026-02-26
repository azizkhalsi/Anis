import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageHeader from '../components/PageHeader';
import Industries from '../components/Industries';
import { INDUSTRIES_DATA } from '../constants/industriesData';

const VALID_INDUSTRIES = ['whitegood', 'powertool', 'automotive'];

export default function IndustriesPage() {
  const { t } = useTranslation();
  const { industryId } = useParams();
  const initialIndustry = industryId && VALID_INDUSTRIES.includes(industryId) ? industryId : 'whitegood';
  const industry = INDUSTRIES_DATA.find((i) => i.id === initialIndustry);
  const title = industry ? t(`industries.${initialIndustry}.title`) : t('nav.industries');
  const description = industry ? t(`industries.${initialIndustry}.description`) : '';

  return (
    <>
      <PageHeader
        tag={t('nav.industries')}
        title={title}
        description={description}
      />
      <Industries initialIndustry={initialIndustry} singleMode />
    </>
  );
}
