import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
// import { getAllEvents } from '../../data/dummy-data'
import EvenLists from '../../components/events/EventList'
import EventSearch from '../../components/events/EventSearch'

const AllEventsPage = (props) => {

  const [items, setItems] = useState(props.items)
  const url = `${process.env.NEXT_PUBLIC_FIREBASE_SERVER}/events.json`
  const { data, error } = useSWR(url)
  
  useEffect(() => {
    const transformedData = []

    for (const key in data) {
      transformedData.push({
        id: key,
        title: data[key].title,
        description: data[key].description,
        date: data[key].date,
        location: data[key].location,
        image: data[key].image,
        isFeatured: data[key].isFeatured,
      })
    }
    setItems(transformedData)
  }, [data])

  // const findFilterdEvents = (year, month) => {
  //   const fullPath = `/events/${year}/${month}`
  //   router.push(fullPath)
  // }

  if (error) {
    return <p>Sorry there is an error</p>
  }

  if (!data && !items) {
    return <p>Loading...</p>
  }

  return (
    <>
      {/* <EventSearch onSearch={findFilterdEvents} /> */}
      <EvenLists items={items} />
    </>
  )
}

export async function getStaticProps() {
  const url = `${process.env.NEXT_PUBLIC_FIREBASE_SERVER}/events.json`
  let transformedData = []
  try {
    const response = await fetch(url)
    const data = await response.json()

    for (const key in data) {
      transformedData.push({
        id: key,
        title: data[key].title,
        description: data[key].description,
        date: data[key].date,
        location: data[key].location,
        image: data[key].image,
        isFeatured: data[key].isFeatured,
      })
    }
  } catch (error) {
    transformedData = []
  }

  return {
    props: {
      items: transformedData
    }
  }
}

export default AllEventsPage
