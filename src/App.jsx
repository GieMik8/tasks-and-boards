import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router'
import { ThemeProvider, CssBaseline, Container } from '@material-ui/core'

import store, { persistor, history } from 'modules'
import { startApp } from 'modules/app'
import { Home } from 'routes'
import theme from 'theme'
import './App.scss'

const App = () => {
  useEffect(() => {
    store.dispatch(startApp())
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ConnectedRouter history={history}>
            <Container>
              <Switch>
                <Route exact path="/" component={Home} />
              </Switch>
            </Container>
          </ConnectedRouter>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  )
}

export default App
