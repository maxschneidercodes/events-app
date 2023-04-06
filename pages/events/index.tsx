import { Fragment } from 'react';
import { useRouter } from 'next/router';
import { getAllEvents } from "../../data/data";
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';


export default function AllEventsPage(props: { events: Event[]; }) {
  const router = useRouter();
  const { events } = props

  function findEventsHandler(year: number, month: number) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList events={events} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events: events
    }
  }
}
