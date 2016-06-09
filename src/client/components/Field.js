import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as types from 'lib/types'
import styles from 'components/_edit.css'
import { updateInvoice } from 'actions'
import { isBlankLineItem } from 'lib/util'

const mapState = state => ({
  invoice: state.invoice,
})

const mapDispatch = { updateInvoice }

class Field extends Component {
  static propTypes = {
    lineItem: PropTypes.number,
    invoice: PropTypes.object,
    id: PropTypes.number,
    name: PropTypes.string,
    label: PropTypes.string,
    className: PropTypes.string,
    type: PropTypes.string,
    children: PropTypes.element,
    updateInvoice: PropTypes.func,
  }

  state = {
    error: false,
    value: null,
  }

  handleChange = persistInput => e => {
    const { lineItem: lineItemId, invoice, type, name, updateInvoice } = this.props
    const { validate, serialize } = types[type] || {}
    const lineItem = invoice.lineItems[lineItemId]
    const value = e.target.value
    const error = !!validate && !isBlankLineItem(lineItem) && validate(value)

    this.setState({error, value: persistInput ? value : null})

    updateInvoice({
      name,
      lineItem: lineItemId,
      value: !error && serialize && value !== '' ? serialize(value) : value,
      error,
    })
  }

  createId() {
    const { id = 'new', name } = this.props
    return `${id}/${name}`
  }

  createLabel() {
    const { name } = this.props
    return name.charAt(0).toUpperCase() + name.slice(1).replace('-', ' ')
  }

  value() {
    if (this.state.value !== null) return this.state.value

    const { lineItem, invoice, name, type } = this.props
    const { error } = this.state
    const { deserialize } = types[type] || {}
    const value = lineItem ? (invoice.lineItems[lineItem] || {})[name]
                           : invoice[name]
    const present = value || parseInt(value) === 0

    return deserialize && present && !error ? deserialize(value) : value
  }

  render() {
    const { invoice, className, name, label, children } = this.props
    const { error } = this.state
    const id = this.createId()

    return (
      <div className={styles.field + ' ' + className}>
        {/* LABEL */}
        <label className={styles.label} htmlFor={id}>{label || this.createLabel()}</label>
        {/* FIELD */}
        {React.cloneElement(children, {
          id,
          name,
          onChange: this.handleChange(true),
          onBlur: this.handleChange(false),
          value: this.value() || '',
        })}
        {/* ERROR */}
        {error && <div className={styles.error}>{error}</div>}
      </div>
    )
  }
}

export default connect(mapState, mapDispatch)(Field)
