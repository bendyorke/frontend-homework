import { toEntity } from 'lib/datomic'

export function loadInvoice(number) {
  return (dispatch, getState) => {
    const payload = () => getState().invoiceList.find(i => i.number == number)

    return dispatch({
      type: 'LOAD_INVOICE',
      payload,
      number,
    })
  }
}

export function newLineItem() {
  return {
    type: 'NEW_LINE_ITEM',
    payload: new Date().getTime() * -1,
  }
}

export function updateInvoice(payload) {
  return {
    type: 'UPDATE_INVOICE',
    payload,
  }
}

export function createInvoice() {
  return (dispatch, getState) => {
    const { errors, lineItems, ...invoice } = getState().invoice

    invoice.lineItems = Object
      .values(lineItems)
      .slice(0, -1)
      .map(li => toEntity('line-item', li))

    const payload = fetch('/api/invoices', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(toEntity('invoice', invoice)),
    }).then(data => data.json())

    return dispatch({
      type: 'CREATE_INVOICE',
      payload,
    })
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
  return dispatch => dispatch({
    type: 'INIT',
    eager: true,
    payload: Promise.all([
      dispatch({ ...fetchInvoices(), eager: true }),
    ]),
  })
}
