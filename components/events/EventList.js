import React from 'react'
import EventItem from './EventItem'

// styling
import styles from './EventList.module.css'

const EventList = (props) => {
  const { items } = props
  console.log(items)
  return (
    <ul className={styles.list}>
      {items.map(item => <EventItem item={item} key={item.id} />)}
    </ul>
  )
}

export default EventList
