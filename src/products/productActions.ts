import { APIProduct, mapAndFilterProducts, Product } from './Products'
import { ActionCreator, Dispatch } from 'redux'
import { AxiosResponse, AxiosInstance } from 'axios'
import { Ingredient } from '../ingredients/Ingredients'
import { DHGetState, DHThunk } from '../store'
import { getAxiosInstance } from '../ingredients/httpClient'

export const PRODUCTS_CALL_FAILED = 'PRODUCTS_CALL_FAILED'
export const UPDATE_PRODUCTS = 'UPDATE_PRODUCTS'

export interface UpdateProductsCallFailedAction {
  type: typeof PRODUCTS_CALL_FAILED,
}

export interface UpdateProductsAction {
  type: typeof UPDATE_PRODUCTS,
  products: Product[],
}

export type ProductActions = UpdateProductsAction | UpdateProductsCallFailedAction

const updateProductsCallFailedAction = (): UpdateProductsCallFailedAction => {
  return {
    type: PRODUCTS_CALL_FAILED,
  }
}

const updateProductsAction = (products: Product[]): UpdateProductsAction => {
  return {
    type: UPDATE_PRODUCTS,
    products,
  }
}

export const fetchProducts: ActionCreator<DHThunk> = (ingredient: Ingredient, httpClient: AxiosInstance = getAxiosInstance()) => async (
  dispatch: Dispatch,
  getState: DHGetState,
): Promise<void> => {
  try {
    const response: AxiosResponse = await httpClient.get('/web-1/data/products.json')
    const apiProducts: APIProduct[] = response.data

    const products = mapAndFilterProducts(apiProducts, getState().ingredientReducer.ingredients, ingredient)
    dispatch(updateProductsAction(products))
  } catch (e) {
    dispatch(updateProductsCallFailedAction())
  }
}
