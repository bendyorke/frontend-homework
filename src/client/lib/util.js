export function lineItemTotal({qty, cost}) {
  if (typeof qty === 'number' || typeof cost === 'number') {
    return ((qty || 0) * (cost || 0)) / 100
  }
}

export function invoiceTotal({lineItems}) {
  return Object.values(lineItems).reduce((memo, li) => {
    if (typeof li.qty === 'number' && typeof li.cost === 'number') {
      memo += (li.qty * li.cost)
    }
    return memo
  }, 0)
}

/**
 * Blank line items are objects without an id and with all falsey
 * values.  If it is a falsey value, then it is not a line item.
 */
export function isBlankLineItem(lineItem) {
  if (!lineItem) return false
  if (Object.keys(lineItem).find(x => x === 'id')) return false
  if (Object.keys(lineItem).filter(x => lineItem[x] !== '').length) return false
  return true
}
