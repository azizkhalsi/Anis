import { useParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Industries from '../components/Industries';
import { INDUSTRIES_DATA } from '../components/Industries';

const VALID_INDUSTRIES = ['whitegood', 'powertool', 'automotive', 'emobility'];

export default function IndustriesPage() {
  const { industryId } = useParams();
  const initialIndustry = industryId && VALID_INDUSTRIES.includes(industryId) ? industryId : 'whitegood';
  const industry = INDUSTRIES_DATA.find((i) => i.id === initialIndustry);
  const title = industry ? industry.title : 'Industries';
  const description = industry ? industry.description : 'Solutions across key markets.';

  return (
    <>
      <PageHeader
        tag="Industries"
        title={title}
        description={description}
      />
      <Industries initialIndustry={initialIndustry} singleMode />
    </>
  );
}
