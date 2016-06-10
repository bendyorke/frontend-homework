import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { date } from 'lib/types'
import styles from 'components/_invoice.css'
import { default as BaseField } from 'components/Field'
import LineItem from 'components/LineItem'
import { invoiceTotal } from 'lib/util'

const mapState = state => ({
  invoice: state.invoice,
})

class Invoice extends Component {
  static propTypes = {
    invoice: PropTypes.object,
    editable: PropTypes.bool,
  }

  state = {
    error: null,
    editable: false,
  }

  grandTotal() {
    const { invoice } = this.props

    const cents = invoiceTotal(invoice)

    return (cents / 100).toFixed(2)
  }

  render() {
    const { editable, invoice } = this.props
    const { error } = this.state
    const Field = editable
                ? BaseField
                : p => <BaseField {...p} editable={false} />

    return (
      <div>
        {/* HEADER */}
        <div className={styles.header}>
          <Field className={styles.recipient} name="recipient" type="email">
            <input placeholder="email@domain.com"/>
          </Field>
          <Field className={styles.dueDate} name="dueDate" type="date">
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
          {Object.entries(invoice.lineItems).map(([id, li]) => (
            <LineItem {...li} id={parseInt(id)} key={id} Field={Field} />
          ))}
        </div>

        {/* TOTAL */}
        <div className={styles.footer}>
          <div style={{flex: 7}} />
          <Field className={styles.grandTotal} name="total" value={this.grandTotal()} />
        </div>

      </div>
    )
  }
}

export default connect(mapState)(Invoice)
