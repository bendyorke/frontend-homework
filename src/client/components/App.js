import React, { Component } from 'react'
import styles from './_styles.css'
import Header from 'components/Header'
import PreviewInvoice from 'components/PreviewInvoice'
import EditInvoice from 'components/EditInvoice'
import InvoiceList from 'components/InvoiceList'

export default class App extends Component {
  route() {
    const { pathname } = window.location

    if (pathname === '/') return <InvoiceList />

    if (pathname === '/new') return <EditInvoice />

    if (!isNaN(pathname.slice(1))) {
      return <PreviewInvoice number={pathname.slice(1)} />
    }

    return <h1>404</h1>
  }

  render() {
    return (
      <div>
        <Header />
        <div className={styles.app}>{this.route()}</div>
      </div>
    )
  }
}
