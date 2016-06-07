import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createInvoice } from 'actions'

const mapDispatch = { createInvoice }

class EditInvoice extends Component {
  static state = {
    notes: '',
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.createInvoice(this.state)
  }

  handleChange = field => e => {
    this.setState({[field]: e.target.value})
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input name="notes" onChange={this.handleChange('notes')} />
          <input type="submit" />
        </form>
      </div>
    )
  }
}

export default connect(null, mapDispatch)(EditInvoice)
