import { useRouter } from 'next/router';
import { getAllEvents, getEventById, getFeaturedEvents } from "../../data/data"
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';

export default function EventDetailPage(props: { selectedEvents: any; }) {
  const { selectedEvents } = props

  if (!selectedEvents) {
    return (
      <p>Loading..</p>
    );
  }

  return (
    <>
      <EventSummary title={selectedEvents.title} />
      <EventLogistics
        date={selectedEvents.date}
        address={selectedEvents.location}
        image={selectedEvents.image}
        imageAlt={selectedEvents.title}
      />
      <EventContent>
        <p>{selectedEvents.description}</p>
      </EventContent>
    </>
  );
}

export async function getStaticProps(context: { params: { eventId: any; }; }) {
  const eventId = context.params.eventId;

  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvents: event
    },
    revalidate: 30
  }
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents()
  const paths = events.map(event => ({ params: { eventId: event.id } }))
  return {
    paths: paths,
    fallback: true,
  }
}