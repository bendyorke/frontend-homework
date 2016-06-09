import React, { Component } from 'react'
import styles from './_styles.css'
import Header from 'components/Header'
import EditInvoice from 'components/EditInvoice'
import ShowInvoices from 'components/ShowInvoices'

export default class App extends Component {
  render() {
    const { pathname } = window.location
    return (
      <div>
        <Header />
        <div className={styles.app}>
          {pathname === '/' && <ShowInvoices />}
          {pathname === '/new' && <EditInvoice />}
          {pathname !== '/' && pathname !== '/new' &&
           <h1>404</h1>
          }
        </div>
      </div>
    )
  }
}
