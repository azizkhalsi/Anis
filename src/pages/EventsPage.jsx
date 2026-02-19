import PageHeader from '../components/PageHeader';
import EventHighlight from '../components/EventHighlight';

export default function EventsPage() {
  return (
    <>
      <PageHeader
        tag="Industry Events"
        title="Appcon at Conferences & Trade Shows"
        description="Where we connect with experts and showcase our latest innovations in motor control and power electronics."
      />
      <EventHighlight />
    </>
  );
}
