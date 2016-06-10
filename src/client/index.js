import React from 'react'
import { render } from 'react-dom'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkM from 'redux-thunk'
import loggerM from 'redux-logger'
import promiseM from 'lib/redux-promise'
import lazyM from 'lib/redux-lazy'

import * as reducers from './reducers'
import { init } from './actions'
import App from 'components/App'

const store = createStore(
  combineReducers(reducers),
  applyMiddleware(thunkM, lazyM(), promiseM, loggerM({ collapsed: true }))
)

store.dispatch(init())
render(<Provider store={store}><App /></Provider>, document.getElementById('app'))
