import { getFeaturedEvents } from "../data/data"
import EventList from "../components/events/event-list";
import Event from "../types/Event";
import NewsletterRegistration from "../components/input/newsletter-registration";

export default function HomePage(props: { featuredEvents: { featuredEvents: Event[]; }; }) {
  const { featuredEvents } = props

  return (<>
    <NewsletterRegistration />
    <EventList events={featuredEvents} />

  </>);
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      featuredEvents: featuredEvents
    }, revalidate: 1800
  }
}