import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import InvoiceRow from 'components/InvoiceRow'

const mapState = state => ({
  invoiceList: state.invoiceList,
})

class InvoiceList extends Component {
  static propTypes = {
    invoiceList: PropTypes.array,
  }

  static defaultProps = {
    invoiceList: [],
  }

  render() {
    return (
      <div>
        <h1>Show Invoices</h1>

        {/* HEADER */}
        <InvoiceRow />

        {/* INVOICES */}
        {this.props.invoiceList.map(invoice => (
          <InvoiceRow {...invoice} key={invoice.id} />
        ))}
      </div>
    )
  }
}

export default connect(mapState)(InvoiceList)
