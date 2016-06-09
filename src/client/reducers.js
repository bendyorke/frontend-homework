import { parseEntity } from 'lib/datomic'

export function invoiceList(state = [], action) {
  switch(action.type) {
    case 'FETCH_INVOICES_SUCCESS':
      const newState = action.payload
        .map(parseEntity.bind(null, 'invoice'))
        .map(invoice => {
          invoice.lineItems = invoice.lineItems
            .map(parseEntity.bind(null, 'line-item'))
            .reduce((memo, li) => ({ ...memo, [li.id]: li }), {})
          return invoice
        })

      return newState

    case 'CREATE_INVOICE_SUCCESS':
      return [...state, parseEntity('invoice', action.payload)]

    default:
      return state
  }
}

const initInvoice = {
  errors: {},
  recipient: '',
  notes: '',
  dueDate: new Date(),
  lineItems: {},
}

export function invoice(state = initInvoice, action) {
  switch(action.type) {
    case 'NEW_LINE_ITEM':
      return {
        ...state,
        lineItems: {
          ...state.lineItems,
          [action.payload]: {},
        },
      }

    case 'UPDATE_INVOICE':
      const { name, lineItem, error, value = null } = action.payload
      const { errors, ...newState } = state

      // Toggle the field error on the global state
      if (error) {
        errors[name] = error
      } else {
        delete errors[name]
      }

      // Set the appropriate value on the appropriate attribute
      if (lineItem && value !== null) {
        newState.lineItems[lineItem][name] = value
        newState.lineItems = { ...newState.lineItems }
      } else if (value !== null) {
        newState[name] = value
      }

      return { ...newState, errors }

    default:
      return state
  }
}
