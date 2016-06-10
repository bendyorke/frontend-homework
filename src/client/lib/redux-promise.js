/**
 * Promise Middleware for Redux
 *
 * Checks if the payload is a promise - if it is, it dispatches actions
 * on SUCCESS and FAILURE.  It returns a standard action, but sets up convenience
 * methods on the actions (then & catch methods).  Asynchronously logs error messages
 * when the promise fails.
 */
const promiseMiddleware = store => {

  /**
   * @param {Object} action - a redux action
   * @param {String} error  - error message (optional)
   *
   * Dispatch an action, optionally async logging an error.
   * Resolves/rejects with the actions payload.
   */
  const dispatch = (action, error) => {
    store.dispatch(action)

    if (error) {
      setTimeout(() => {throw new Error(error)}, 0)
      return Promise.reject(action.payload)
    }

    return Promise.resolve(action.payload)
  }

  /**
   * @param {Object} payload - subject in question
   * @return {Bool}
   *
   * Check if an object resembles a promise.
   */
  const isPromise = payload => {
    return payload && typeof payload.then === 'function'
  }

  return next => action => {
    const { type, payload, ...options } = action

    if (isPromise(payload)) {
      payload.then(
        /**
         * Catch fetch errors
         */
        data => data.ok !== false
              ? dispatch({ type: type + '_SUCCESS', payload: data, ...options})
              : dispatch({ type: type + '_FAILURE', payload: data, ...options}, data.statusText),
        data => dispatch({ type: type + '_FAILURE', payload: data, ...options}, data)
      )

      /**
       * Bind then & catch methods to the action for easier chaining.
       */
      action.then = payload.then.bind(payload)
      action.catch = payload.catch.bind(payload)
    }

    return next(action)
  }
}

export default promiseMiddleware
