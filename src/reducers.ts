import { combineReducers } from 'redux'
import { productReducer } from './products/productReducer'
import { ingredientReducer } from './ingredients/ingredientsReducer'

export const rootReducer = combineReducers({
  productReducer: productReducer,
  ingredientReducer: ingredientReducer,
})

export type RootState = ReturnType<typeof rootReducer>
