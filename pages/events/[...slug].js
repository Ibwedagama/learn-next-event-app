import React from 'react'
import { useRouter } from 'next/router'
import { getFilteredEvents } from '../../data/dummy-data'
import EventList from '../../components/events/EventList'
import ResultsTitle from '../../components/events/ResultsTitle'

const FilteredEventsPage = () => {
  const router = useRouter()
  const filteredData = router.query.slug

  if (!filteredData) {
    return <p className='center'>Loading...</p>
  }

  const filteredYear = filteredData[0]
  const filteredMonth = filteredData[1]

  const numYear = +filteredYear
  const numMonth = +filteredMonth

  if (isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear < 2013 ||
    numYear > 2023 ||
    numMonth > 12 ||
    numMonth < 1) {
    return <p className='center'>Invalid filter, please adjust your values!</p>
  }

  const filteredEvents = getFilteredEvents({ year: numYear, month: numMonth })

  if (!filteredEvents || filteredEvents.length === 0) {
    return <p>No events for the chosen filter</p>
  }

  const date = new Date(numYear, numMonth - 1)

  return (
    <>
      <ResultsTitle date={date}/>
      <EventList items={filteredEvents} />
    </>
  )
}

export default FilteredEventsPage
