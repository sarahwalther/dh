// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect'
import thunk, { ThunkDispatch } from 'redux-thunk'
import { RootState } from './reducers'
import { AnyAction, Middleware } from 'redux'
import configureMockStore, { MockStoreCreator } from 'redux-mock-store'
import axios, { AxiosInstance } from 'axios'
import moxios from 'moxios'

export type Mock = jest.Mock

const middlewares: Array<Middleware> = [thunk]
export const mockStoreCreator: MockStoreCreator<RootState, DispatchExts> = configureMockStore<RootState, DispatchExts>(middlewares)

const fakeAxios: AxiosInstance = axios.create({ baseURL: 'test.com' })
export type DispatchExts = ThunkDispatch<RootState, undefined, AnyAction>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setupMockStore = (passedInStore: Partial<RootState>): any => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  moxios.install(fakeAxios)
  return mockStoreCreator({
    productReducer: {
      products: passedInStore.productReducer?.products ? passedInStore.productReducer?.products : [],
      productsCallFailed: passedInStore.productReducer?.productsCallFailed ? passedInStore.productReducer?.productsCallFailed : false,
    },
    ingredientReducer: {
      ingredients: passedInStore.ingredientReducer?.ingredients ? passedInStore.ingredientReducer.ingredients : [],
      selectedIngredient: passedInStore.ingredientReducer?.selectedIngredient ? passedInStore.ingredientReducer.selectedIngredient : undefined,
      ingredientIsValid: passedInStore.ingredientReducer?.ingredientIsValid ? passedInStore.ingredientReducer.ingredientIsValid : true,
      ingredientsCallFailed: passedInStore.ingredientReducer?.ingredientsCallFailed ? passedInStore.ingredientReducer.ingredientsCallFailed : false,
    },
  })
}
