import { toEntity } from 'lib/datomic'

export function createInvoice(invoice) {
  const payload = fetch('/api/invoices', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(toEntity('invoice', invoice)),
  }).then(data => data.json())

  return {
    type: 'CREATE_INVOICE',
    payload,
  }
}

export function fetchInvoices() {
  const payload = fetch('/api/invoices')
    .then(data => data.json())

  return {
    type: 'FETCH_INVOICES',
    payload,
  }
}

export function init() {
  return dispatch => ({
    type: 'INIT',
    payload: Promise.all([
      dispatch(fetchInvoices()),
    ]),
  })
}
