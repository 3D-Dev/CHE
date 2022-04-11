import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Route } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import 'assets/vendors/style'
import 'styles/xyon.less'

import configureStore, { history } from './appRedux/store'
import registerServiceWorker from './registerServiceWorker'
import App from './App'

const store = configureStore()
const pStore = persistStore(store)

// Wrap the rendering in a function:
const render = () => {
  ReactDOM.render(
    // Wrap App inside AppContainer
    <AppContainer>
      <Provider store={store}>
        <PersistGate loading={null} persistor={pStore}>
          <ConnectedRouter history={history}>
            <Route path="/" component={App}/>
          </ConnectedRouter>
        </PersistGate>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
}

// Do this once
registerServiceWorker()

// Render once
render()

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./App', () => {
    render()
  })
}
