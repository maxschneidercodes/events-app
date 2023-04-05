import EventItem from './event-item';
import classes from './event-list.module.css';
import Event from "../../types/Event"


function EventList(props: { events: any; }) {
  const { events } = props;

  if (!events) {
    return <p>Loading..</p>
  }

  return (
    <ul className={classes.list}>
      {events.map((event: Event, index: number) => (
        <EventItem
          key={index}
          id={event.id}
          title={event.title}
          description={event.description}
          location={event.location}
          date={event.date}
          image={event.image}
          isFeatured={event.isFeatured}
        />
      ))}
    </ul>
  );
}

export default EventList;
