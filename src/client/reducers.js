import { parseEntity } from 'lib/datomic'

export function invoiceList(state = [], action) {
  switch(action.type) {
    case 'FETCH_INVOICES_SUCCESS':
      return action.payload.map(parseEntity.bind(null, 'invoice'))
    case 'CREATE_INVOICE_SUCCESS':
      return [...state, parseEntity('invoice', action.payload)]
    default:
      return state
  }
}

export function invoice(state = {}, action) {
  return state
}
