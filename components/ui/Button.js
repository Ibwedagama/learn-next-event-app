import React from 'react'
import Link from 'next/link'

// styling
import styles from './Button.module.css'

const Button = (props) => {
  if (props.link) {
    return (
      <Link href={props.link}>
        <a className={styles.btn}>{props.children}</a>
      </Link>
    )
  }
  return <button onClick={props.onClick} className={styles.btn}>{props.children}</button>
}

export default Button
