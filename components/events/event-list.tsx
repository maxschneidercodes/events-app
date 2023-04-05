import EventItem from './event-item';
import classes from './event-list.module.css';
import EventType from "../../types/Events"
function EventList(props: { items: any; }) {
  const { items } = props;

  return (
    <ul className={classes.list}>
      {items.map((event: EventType, index: number) => (
        <EventItem
          key={index}
          id={event.id}
          title={event.title}
          location={event.location}
          date={event.date}
          image={event.image}
        />
      ))}
    </ul>
  );
}

export default EventList;
