import React, { ReactElement } from 'react'
import './styles/App.scss'
import Header from './Header'
import IngredientForm from './ingredients/IngredientForm'
import { Provider } from 'react-redux'
import store from './store'
import ProductList from './products/ProductList';

function App(): ReactElement {
  console.log('store')
  console.log(store)
  return (
    <Provider store={store}>
      <div className="App container-fluid">
        <Header/>
        <IngredientForm/>
        <ProductList/>
      </div>
    </Provider>
  )
}

export default App
