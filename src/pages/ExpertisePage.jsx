import { useParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import ExpertiseSingle from '../components/ExpertiseSingle';
import { TABS } from '../components/Expertise';

export default function ExpertisePage() {
  const { topicId } = useParams();
  const tab = topicId ? TABS.find((t) => t.id === topicId) : null;
  const title = tab ? tab.label : 'Expertise';
  const description = tab
    ? `Deep domain knowledge in ${tab.label.toLowerCase()} for motor control and power electronics.`
    : 'Deep domain knowledge across motor control and power electronics development.';

  return (
    <>
      <PageHeader
        tag="Expertise"
        title={title}
        description={description}
      />
      <ExpertiseSingle />
    </>
  );
}
