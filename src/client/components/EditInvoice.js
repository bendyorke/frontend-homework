import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { createInvoice, newLineItem } from 'actions'
import { date } from 'lib/types'
import styles from 'components/_edit.css'
import Field from 'components/Field'
import EditLineItem from 'components/EditLineItem'
import { invoiceTotal, isBlankLineItem } from 'lib/util'

const mapState = state => ({
  lineItems: state.invoice.lineItems,
  valid: Object.keys(state.invoice.errors).length === 0,
})

const mapDispatch = { createInvoice, newLineItem }

class EditInvoice extends Component {
  static propTypes = {
    createInvoice: PropTypes.func,
    newLineItem: PropTypes.func,
    lineItems: PropTypes.object,
    valid: PropTypes.bool,
  }

  handleSubmit = e => {
    const { valid } = this.props

    e.preventDefault()
    if (!valid) return

    this.props.createInvoice()
    window.location = window.location.origin
  }

  componentWillMount() {
    this.ensureExtraLineItem(this.props)
  }

  componentWillReceiveProps(props) {
    this.ensureExtraLineItem(props)
  }

  ensureExtraLineItem(props) {
    const { lineItems, newLineItem } = props
    const lastId = Object.keys(lineItems).sort((a, b) => parseInt(a) - parseInt(b))[0]
    const last = lastId && lineItems[lastId]

    if (!last || !isBlankLineItem(last)) newLineItem()
  }

  grandTotal() {
    const { lineItems } = this.props

    const cents = invoiceTotal({lineItems})

    return (cents / 100).toFixed(2)
  }

  render() {
    const { valid, lineItems } = this.props

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>Create Invoice</h1>

          {/* HEADER */}
          <div className={styles.header}>
            <Field className={styles.recipient} name="recipient" type="email">
              <input placeholder="email@domain.com"/>
            </Field>
            <Field className={styles.dueDate} name="due-date" type="date">
              <input placeholder={date.deserialize(new Date().toISOString())} />
            </Field>
            <Field className={styles.notes} name="notes">
              <textarea className={styles.notesField} placeholder="Notes..."/>
            </Field>
          </div>

          {/* LINE ITEMS */}
          <div className={styles.lineItemHeader}>
            <div className={styles.qty+' '+styles.label}>Qty.</div>
            <div className={styles.description+' '+styles.label}>Description</div>
            <div className={styles.cost+' '+styles.label}>Price</div>
            <div className={styles.total+' '+styles.label}>Amount</div>
          </div>

          <div>
            {Object.entries(lineItems).map(([id, li]) => (
              <EditLineItem {...li} id={parseInt(id)} key={id}/>
            ))}
          </div>

          {/* TOTAL */}
          <div className={styles.footer}>
            <div style={{flex: 7}} />
            <Field className={styles.grandTotal} name="Total">
              <output>{this.grandTotal()}</output>
            </Field>
          </div>

          {/* SUBMIT */}
          <input type="submit" disabled={!valid}/>
        </form>
      </div>
    )
  }
}

export default connect(mapState, mapDispatch)(EditInvoice)
