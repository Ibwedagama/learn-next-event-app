import React from 'react'
import { getAllEvents } from '../../data/dummy-data'
import EvenLists from '../../components/events/EventList'

const AllEventsPage = () => {
  const events = getAllEvents()
  return (
    <div>
      <EvenLists items={events}/>
    </div>
  )
}

export default AllEventsPage
