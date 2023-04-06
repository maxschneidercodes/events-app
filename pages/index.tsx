import { getFeaturedEvents } from "../data/data"
import EventList from "../components/events/event-list";
import Event from "../types/Event";

export default function HomePage(props: { featuredEvents: { featuredEvents: Event[]; }; }) {
  const { featuredEvents } = props

  return (
    <div>
      <EventList events={featuredEvents} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      featuredEvents: featuredEvents
    }, revalidate: 1800
  }
}