import React from 'react'
import Link from 'next/link'

// styling
import styles from './EventItem.module.css'

const EventItem = (props) => {
  const { title, date, location, id, image } = props.item

  const humanReadableDate = new Date(date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  const formatedAddress = location.replace(', ', '\n')

  const exploreLink = `/events/${id}`

  return (
    <li className={styles.item}>
      <img src={`/${image}`} alt={title} />
      <div className={styles.content}>
        <div className={styles.summary}>
          <h2>{title}</h2>
          <div>
            <time className={styles.date}>{humanReadableDate}</time>
          </div>
          <div>
            <address className={styles.address}>{formatedAddress}</address>
          </div>
        </div>
        <div>
          <Link href={exploreLink} className={styles.actions}>Explore Link</Link>
        </div>
      </div>
    </li>
  )
}

export default EventItem
