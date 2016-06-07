import React, { Component } from 'react'
import { connect } from 'react-redux'

const mapState = state => ({
  invoiceList: state.invoiceList,
})

class ShowInvoices extends Component {
  render() {
    return (
      <div>
        {this.props.invoiceList.map((invoice, i) =>
          <div key={i}>{invoice.number} => {invoice.notes}</div>
        )}
      </div>
    )
  }
}

export default connect(mapState)(ShowInvoices)
