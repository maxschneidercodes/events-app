import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getFilteredEvents } from "../../data/data"
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';
import Event from '../../types/Event';

interface DateFilter {
  year: number,
  month: number,
}

export default function FilteredEventsPage() {
  const router = useRouter();

  const [getFilteredEventsData, setFilteredEventsData] = useState<Event[]>()
  const [getFilterData, setFilterData] = useState<DateFilter>({ year: 0, month: 0 })

  async function fetchEventsWith(numYear: number, numMonth: number) {
    const filteredEvents = await getFilteredEvents({
      year: numYear,
      month: numMonth,
    });

    setFilteredEventsData(filteredEvents)
  }

  useEffect(() => {
    const filterData = router.query.slug

    if (filterData) {
      const filteredYear = filterData[0];
      const filteredMonth = filterData[1];

      const numYear = +filteredYear;
      const numMonth = +filteredMonth;

      setFilterData({ year: numYear, month: numMonth })
      fetchEventsWith(numYear, numMonth)
    }
  }, [])

  if (!getFilteredEventsData) {
    return <p className='center'>Loading...</p>;
  }

  if (!getFilteredEventsData || getFilteredEventsData.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className='center'>
          <Button onClick={() => { }} link='/events'>Show All Events</Button>
        </div>
      </>
    );
  }

  const date = new Date(getFilterData.year, getFilterData.month - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <EventList events={getFilteredEventsData} />
    </>
  );
}
