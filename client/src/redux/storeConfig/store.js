
import { createStore, applyMiddleware, compose } from "redux"

import createDebounce from "redux-debounced"
import thunk from "redux-thunk"
import rootReducer from "../reducer/rootReducer"

const middlewares = [thunk, createDebounce()]

const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
)

export { store }
