import React from 'react'
import styles from 'components/_styles.css'

const Header = () => (
  <div className={styles.header}>
    <div className={styles.app}>
      <a className={styles.home} href="/">Invoicer</a>
      <a className={styles.create} href="/new">New Invoice</a>
    </div>
  </div>
)

export default Header
