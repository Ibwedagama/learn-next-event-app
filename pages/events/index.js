import React from 'react'
import {useRouter} from 'next/router'
import { getAllEvents } from '../../data/dummy-data'
import EvenLists from '../../components/events/EventList'
import EventSearch from '../../components/events/EventSearch'

const AllEventsPage = () => {
  const events = getAllEvents()

  const router = useRouter()

  const findFilterdEvents = (year, month) => {
    const fullPath = `/events/${year}/${month}`
    router.push(fullPath)
  }

  return (
    <>
      <EventSearch onSearch={findFilterdEvents}/>
      <EvenLists items={events}/>
    </>
  )
}

export default AllEventsPage
