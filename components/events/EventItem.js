import React from 'react'
import Button from '../ui/Button'

// icons
import DateIcon from '../icons/date-icon'
import AddressIcon from '../icons/address-icon'
import ArrowRight from '../icons/arrow-right-icon'

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
          <div className={styles.date}>
            <DateIcon />
            <time>{humanReadableDate}</time>
          </div>
          <div className={styles.address}>
            <AddressIcon />
            <address>{formatedAddress}</address>
          </div>
        </div>
        <div>
          <Button link={exploreLink}>
            <span>Explore Event</span>
            <span className={styles.icon}><ArrowRight/></span>
            </Button>
        </div>
      </div>
    </li>
  )
}

export default EventItem
