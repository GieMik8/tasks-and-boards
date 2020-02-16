import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import './App.scss'

import store from 'modules'
import { startApp } from 'modules/app'

console.log(process.env)

const App = () => {
  useEffect(() => {
    store.dispatch(startApp())
  }, [])

  return (
    <Provider store={store}>
      <div className="App">
        <p>Nothingness</p>
      </div>
    </Provider>
  )
}

export default App
