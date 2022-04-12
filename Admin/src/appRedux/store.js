import { applyMiddleware, compose, createStore } from 'redux'
import createRootReducer from './reducers'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'custom']
}

export const history = createBrowserHistory()
const routeMiddleware = routerMiddleware(history)
const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware, routeMiddleware]
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const persistedReducer = persistReducer(persistConfig, createRootReducer(history))

export default function configureStore(initialState) {
  const store = createStore(
    persistedReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  )

  sagaMiddleware.run(rootSaga)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createRootReducer(history))
      // const nextCreateRootReducer = require('./reducers')
      // store.replaceReducer(nextCreateRootReducer(history))
    })
  }
  return store
}
