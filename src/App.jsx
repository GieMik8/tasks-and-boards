import React, { useEffect } from 'react'
import { Provider, batch } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { ThemeProvider, CssBaseline } from '@material-ui/core'

import store, { history } from 'modules'
import { startApp } from 'modules/app'
import { fetchData } from 'modules/tasks'
import { AppContainer } from 'components'
import theme from 'theme'
import './App.scss'

const App = () => {
  useEffect(() => {
    batch(() => {
      store.dispatch(startApp())
      store.dispatch(fetchData())
    })
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <AppContainer />
        </ConnectedRouter>
      </Provider>
    </ThemeProvider>
  )
}

export default App
