import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Invoice from 'components/Invoice'

const mapState = state => ({
  invoiceList: state.invoiceList,
})

class ShowInvoices extends Component {
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
        <Invoice />

        {/* INVOICES */}
        {this.props.invoiceList.map(invoice => (
          <Invoice {...invoice} key={invoice.id} />
        ))}
      </div>
    )
  }
}

export default connect(mapState)(ShowInvoices)
