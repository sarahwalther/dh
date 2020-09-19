import { APIProduct, Product, ProductCollection } from './Products'
import { Ingredient } from '../ingredients/Ingredients'
import moxios from 'moxios'
import {
  fetchProducts,
  UPDATE_PRODUCTS,
  UpdateProductsAction,
  UpdateProductsCallFailedAction,
  PRODUCTS_CALL_FAILED,
} from './productActions'
import axios, { AxiosInstance } from 'axios'
import { MockStoreEnhanced } from 'redux-mock-store'
import { RootState } from '../reducers'
import { DispatchExts, setupMockStore } from '../setupTests'

describe('ProductActions', () => {
  const fakeAxios: AxiosInstance = axios.create({ baseURL: 'test.com' })
  let store: MockStoreEnhanced<RootState, DispatchExts>
  const acai: Ingredient = {
    id: 1,
    name: 'Acai',
  }

  const cherry: Ingredient = {
    id: 2,
    name: 'Cherry',
  }

  const ingredients: Ingredient[] = [
    acai,
    cherry,
  ]

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    moxios.install(fakeAxios)

    store = setupMockStore({
      ingredientReducer: {
        ingredients: ingredients,
        selectedIngredient: undefined,
        ingredientIsValid: true,
        ingredientsCallFailed: false,
      },
    })
  })

  afterEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    moxios.uninstall(fakeAxios)
  })

  describe('on success', () => {
    const acaiCherrySmoothie: APIProduct = {
      id: 1,
      name: 'Acai + Cherry',
      collection: 'Smoothie',
      ingredientIds: [1, 2],
      image: {
        url: 'https://www.daily-harvest.com/static/img/products/01-acai/product-shot-ingredients.jpeg',
      },
    }

    const shouldntBtIncluded: APIProduct = {
      id: 2,
      name: 'Something else',
      collection: 'Smoothie',
      ingredientIds: [1, 3],
      image: {
        url: 'https://www.daily-harvest.com/static/img/products/01-acai/product-shot-ingredients.jpeg',
      },
    }

    const apiProducts: APIProduct[] = [acaiCherrySmoothie, shouldntBtIncluded]

    const products: Product[] = [
      {
        id: 1,
        name: 'Acai + Cherry',
        collection: ProductCollection.Smoothie,
        ingredients: [
          acai,
          cherry,
        ],
        image: {
          url: 'https://www.daily-harvest.com/static/img/products/01-acai/product-shot-ingredients.jpeg',
        },
        missingIngredients: [],
      },
    ]

    beforeEach(() => {
      moxios.stubRequest('/web-1/data/products.json', {
        status: 200,
        response: apiProducts,
      })
    })

    it('should set the products that match the ingredient', async () => {
      const expectedAction: UpdateProductsAction = {
        type: UPDATE_PRODUCTS,
        products,
      }

      await store.dispatch(fetchProducts(cherry, fakeAxios))
      const actionsCalled = store.getActions()

      expect(actionsCalled[0]).toEqual(expectedAction)
    })
  })

  describe('on error', () => {
    beforeEach(() => {
      moxios.stubRequest('/web-1/data/products.json', {
        status: 400,
        response: { message: 'some error' },
      })
    })

    it('should dispatch the PRODUCTS_CALL_FAILED action', async () => {
      const expectedAction: UpdateProductsCallFailedAction = {
        type: PRODUCTS_CALL_FAILED,
      }

      await store.dispatch(fetchProducts(cherry, fakeAxios))
      const actionsCalled = store.getActions()

      expect(actionsCalled[0]).toEqual(expectedAction)
    })
  })
})
