import React, { Component, PropTypes } from 'react'
import styles from 'components/_invoice_row.css'
import { invoiceTotal } from 'lib/util'
import Icon from 'components/Icon'

const collapsed = Symbol('collapsed')
const expanded = Symbol('expanded')

class InvoiceRow extends Component {
  static propTypes = {
    id: PropTypes.number,
    number: PropTypes.number,
    notes: PropTypes.string,
  }

  state = {
    actions: collapsed,
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

    if (this.state.actions === collapsed) {
      return <Icon name="more" onClick={() => this.setState({actions: expanded})}/>
    }

    return (
      <div className={styles.actionRow}>
        <Icon name="deliver" action={false} />
        <Icon name="collect" action={false} />
        <a href={'/' + this.props.number}>
          <Icon name="preview" />
        </a>
        <Icon name="close" onClick={() => this.setState({actions: collapsed})}/>
      </div>
    )
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

export default InvoiceRow
