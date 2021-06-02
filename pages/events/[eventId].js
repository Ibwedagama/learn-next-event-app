import React from 'react'
import { useRouter } from 'next/router'
import { getEventById } from '../../data/dummy-data'

const EventDetailPage = () => {
  const router = useRouter()
  const eventId = router.query.eventId
  const event = getEventById(eventId)

  if (!event) {
    return <p>No Events Found!</p>
  }
  
  return (
    <div>
      <h1>This is single event page</h1>
    </div>
  )
}

export default EventDetailPage
