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
