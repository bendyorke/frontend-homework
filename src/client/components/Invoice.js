import React, { Component, PropTypes } from 'react'
import styles from 'components/_invoice.css'

class Invoice extends Component {
  static propTypes = {
    id: PropTypes.number,
    number: PropTypes.number,
    notes: PropTypes.string,
  }

  get isHeading() {
    return !this.props.id
  }

  number() {
    if (this.isHeading) return 'Number'

    return this.props.number
  }

  notes() {
    if (this.isHeading) return 'Notes'

    return this.props.notes
  }

  total() {
    if (this.isHeading) return 'Total'

    return '$100.00'
  }

  render() {
    return (
      <div className={this.isHeading ? styles.headingContainer : styles.standardContainer}>
        <div className={styles.number}>{this.number()}</div>
        <div className={styles.notes}>{this.notes()}</div>
        <div className={styles.total}>{this.total()}</div>
      </div>
    )
  }
}

export default Invoice
