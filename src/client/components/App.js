import React, { Component } from 'react'
import styles from './_styles.css'
import EditInvoice from 'components/EditInvoice'
import ShowInvoices from 'components/ShowInvoices'

export default class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <EditInvoice />
        <ShowInvoices />
      </div>
    )
  }
}
