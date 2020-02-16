import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import './App.scss'

import store, { persistor } from 'modules'
import { startApp } from 'modules/app'

const App = () => {
  useEffect(() => {
    store.dispatch(startApp())
  }, [])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <p>Nothingness</p>
        </div>
      </PersistGate>
    </Provider>
  )
}

export default App
