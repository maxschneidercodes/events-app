import Event from "../types/Event"

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents()
  return allEvents.filter((event) => event.isFeatured);
}

 export async function getAllEvents() {
  const res = await fetch("https://events-app-cd13c-default-rtdb.europe-west1.firebasedatabase.app/events.json")
  const data = await res.json()
  const arr : Event[] = Object.keys(data).map((i) => data[i])

  return arr
}

interface DateFilter {
    year: number,
    month: number
}

export async function getFilteredEvents(dateFilter : DateFilter) {
  const allEvents = await getAllEvents()

  const { year, month } = dateFilter;

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
  });

  return filteredEvents;
}

export async function getEventById(id: string) {
  const allEvents = await getAllEvents()
  return allEvents.find((event) => event.id === id);
}