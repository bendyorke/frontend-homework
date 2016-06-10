import React from 'react'
import styles from 'components/_styles.css'

const Output = ({ value, children, className, ...props }) => (
  <div className={styles.output +' '+ className} {...props}>{children || value}</div>
)

export default Output
