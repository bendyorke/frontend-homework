import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadInvoice } from 'actions'
import Invoice from 'components/Invoice'

const mapState = state => ({
  invoice: state.invoice,
})

const mapDispatch = { loadInvoice }

class PreviewInvoice extends Component {
  static propTypes = {
    number: PropTypes.string,
    invoice: PropTypes.object,
    loadInvoice: PropTypes.func,
  }

  componentWillMount() {
    this.props.loadInvoice(this.props.number)
  }

  notFound() {
    const { number } = this.props
    return <div>No invoice found with number {number}</div>
  }

  render() {
    const {
      invoice: {
        errors: { notFound },
        number,
      },
    } = this.props
    const loading = isNaN(parseInt(number))

    if (notFound) return this.notFound()

    return (
      <div>
        <h1>Invoice #{number}</h1>

        {loading ? <div>Loading...</div> : <Invoice />}
      </div>
    )
  }

}

export default connect(mapState, mapDispatch)(PreviewInvoice)
