import { ProductState } from './Products'
import { ProductActions, PRODUCTS_CALL_FAILED, UPDATE_PRODUCTS } from './productActions'

const initialState: ProductState = {
  products: [],
  productsCallFailed: false,
}

export const productReducer = (
  state = initialState,
  action: ProductActions,
): ProductState => {
  switch (action.type) {
    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: action.products,
      }
    case PRODUCTS_CALL_FAILED:
      return {
        ...state,
        productsCallFailed: true,
      }
    default:
      return state
  }
}
