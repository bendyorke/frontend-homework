import React, { Component, PropTypes } from 'react'
import styles from 'components/_invoice.css'
import { invoiceTotal } from 'lib/util'

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

  status() {
    if (this.isHeading) return 'Status'

    if (new Date(this.props.dueDate).getTime() <= new Date().getTime()) {
      return 'Late'
    }

    return 'Outstanding'
  }

  recipient() {
    if (this.isHeading) return 'Recipient'

    return this.props.recipient
  }

  total() {
    if (this.isHeading) return 'Total'

    return (invoiceTotal(this.props) / 100).toFixed(2)
  }

  actions() {
    if (this.isHeading) return 'Actions'

    return 'Email / Pay'
  }

  render() {
    return (
      <div className={this.isHeading ? styles.headingContainer : styles.standardContainer}>
        <div className={styles.number}>{this.number()}</div>
        <div className={styles.status}>{this.status()}</div>
        <div className={styles.recipient}>{this.recipient()}</div>
        <div className={styles.total}>{this.total()}</div>
        <div className={styles.actions}>{this.actions()}</div>
      </div>
    )
  }
}

export default Invoice
