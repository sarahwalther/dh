import { Ingredient } from '../ingredients/Ingredients'
import { Product, ProductCollection } from './Products'
import {
  PRODUCTS_CALL_FAILED,
  UPDATE_PRODUCTS,
  UpdateProductsAction,
  UpdateProductsCallFailedAction,
} from './productActions'
import { productReducer } from './productReducer'

describe('ProductReducer', () => {
  let cherry: Ingredient
  let product: Product
  let products: Product[]

  beforeEach(() => {
    cherry = {
      id: 1,
      name: 'Cherry',
    }

    product = {
      id: 1,
      name: 'Acai + Cherry',
      collection: ProductCollection.Smoothie,
      ingredients: [
        cherry,
      ],
      image: {
        url: 'https://www.daily-harvest.com/static/img/products/01-acai/product-shot-ingredients.jpeg',
      },
      missingIngredients: [],
    }

    products = [product]
  })

  describe('UPDATE_PRODUCTS', () => {
    it('should update the products', () => {
      const action: UpdateProductsAction = {
        type: UPDATE_PRODUCTS,
        products,
      }

      const updatedState = productReducer(undefined, action)

      expect(updatedState.products).toHaveLength(1)
      expect(updatedState.products).toEqual(products)
    })
  })

  describe('PRODUCTS_CALL_FAILED', () => {
    it('should update the products', () => {
      const action: UpdateProductsCallFailedAction = {
        type: PRODUCTS_CALL_FAILED,
      }

      const updatedState = productReducer(undefined, action)

      expect(updatedState.productsCallFailed).toBeTruthy()
    })
  })
})
