import React, { ReactElement } from 'react'
import './styles/App.scss'
import Header from './Header'
import IngredientForm from './ingredients/IngredientForm'
import { Provider } from 'react-redux'
import store from './store'

function App(): ReactElement {
  console.log('store')
  console.log(store)
  return (
    <Provider store={store}>
      <div className="App">
        <Header/>
        <IngredientForm/>
      </div>
    </Provider>
  )
}

export default App
