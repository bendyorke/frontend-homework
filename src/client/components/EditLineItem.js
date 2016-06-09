import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Field from 'components/Field'
import styles from 'components/_edit.css'
import { lineItemTotal } from 'lib/util'

class EditLineItem extends Component {
  static propTypes = {
    id: PropTypes.number,
    qty: PropTypes.number,
    description: PropTypes.string,
    cost: PropTypes.number,
  }

  resizeDescription = e => {
    e.target.style.height = '1px'
    e.target.style.height = `${e.target.scrollHeight}px`
  }

  total() {
    const { qty, cost } = this.props
    const cents = lineItemTotal({qty, cost})
    return typeof cents === 'number' ? cents.toFixed(2) : ''
  }

  render() {
    return (
      <div className={styles.lineItem}>
        <Field name="qty" lineItem={this.props.id} className={styles.qty} type="number">
          <input placeholder="1.00"/>
        </Field>
        <Field name="description" lineItem={this.props.id} className={styles.description}>
          <textarea onKeyUp={this.resizeDescription} placeholder="Description..."/>
        </Field>
        <Field name="cost" lineItem={this.props.id} className={styles.cost} type="cents">
          <input placeholder="9.99"/>
        </Field>
        <div className={styles.total}>
          {this.total()}
        </div>
      </div>
    )
  }
}

export default EditLineItem
