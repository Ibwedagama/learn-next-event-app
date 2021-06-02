import React from 'react'
import { useRouter } from 'next/router'
import { getEventById } from '../../data/dummy-data'

// Components
import EventSummary from '../../components/event-detail/event-summary'
import EventLogisctics from '../../components/event-detail/event-logistics'
import EventContent from '../../components/event-detail/event-content'

const EventDetailPage = () => {
  const router = useRouter()
  const eventId = router.query.eventId
  const event = getEventById(eventId)
console.log(event)
  if (!event) {
    return <p>No Events Found!</p>
  }

  return (
    <div>
      <>
        <EventSummary title={event.title} />
        <EventLogisctics
          date={event.date}
          address={event.location}
          image={event.image}
          imageAlt={event.title}
        >
        </EventLogisctics>
        <EventContent>
          <p>{event.description}</p>
        </EventContent>
      </>
    </div>
  )
}

export default EventDetailPage
