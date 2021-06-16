import React from 'react'
import { useRouter } from 'next/router'
// import { getEventById } from '../../data/dummy-data'

// Components
import EventSummary from '../../components/event-detail/event-summary'
import EventLogisctics from '../../components/event-detail/event-logistics'
import EventContent from '../../components/event-detail/event-content'

const EventDetailPage = (props) => {

  const { event } = props

  if (!event) {
    return <p>No Events Found!</p>
  }

  if (props.error){
    return <p>Error fetching data</p>
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

export async function getServerSideProps(context) {
  const { params } = context
  const url = `${process.env.NEXT_PUBLIC_FIREBASE_SERVER}/events/${params.eventId}.json`
  try {
    const response = await fetch(url)
    const data = await response.json()
    return {
      props: {
        event: data
      }
    }
  } catch (error) {
    console.log(error)
    return {
      props: {
        error: error
      }
    }
  }
}

export default EventDetailPage
