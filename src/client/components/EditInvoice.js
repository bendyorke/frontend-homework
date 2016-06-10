import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadInvoice, createInvoice, newLineItem } from 'actions'
import styles from 'components/_invoice.css'
import Invoice from 'components/Invoice'
import { invoiceTotal, isBlankLineItem } from 'lib/util'

const mapState = state => ({
  lineItems: state.invoice.lineItems,
  valid: Object.keys(state.invoice.errors).length === 0,
})

const mapDispatch = { loadInvoice, createInvoice, newLineItem }

class EditInvoice extends Component {
  static propTypes = {
    loadInvoice: PropTypes.func,
    createInvoice: PropTypes.func,
    newLineItem: PropTypes.func,
    lineItems: PropTypes.object,
    valid: PropTypes.bool,
  }

  state = {
    error: null,
  }

  handleSubmit = e => {
    const { valid } = this.props

    e.preventDefault()
    if (!valid) return

    this.props.createInvoice()
      .then(() => window.location = window.location.origin)
      .catch(res => this.setState({error: res.statusText}))
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
    const { valid } = this.props
    const { error } = this.state

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>Create Invoice</h1>

          <Invoice editable={true} />

          {/* SUBMIT */}
          <input type="submit" disabled={!valid}/>

          {/* ERROR */}
          <div className={styles.error}>{error}</div>
        </form>
      </div>
    )
  }
}

export default connect(mapState, mapDispatch)(EditInvoice)
