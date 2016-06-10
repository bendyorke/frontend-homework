/**
 * Lazy middleware for Redux
 *
 * Delays all actions until a specific action has fired.  Can be
 * ignored by setting eager to true in your action
 */


const lazyMiddleware = (waitForAction = 'INIT_SUCCESS', {interval = 10} = {}) => {
  let actionFired = false

  return store => next => action => {
    if (action.type === waitForAction) actionFired = true

    if (actionFired || action.eager) return next(action)

    setTimeout(() => store.dispatch(action), interval)
  }
}

export default lazyMiddleware
