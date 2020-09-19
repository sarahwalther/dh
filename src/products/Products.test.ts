import { APIProduct, mapAndFilterProducts, Product, ProductCollection } from './Products'
import { Ingredient } from '../ingredients/Ingredients'

describe('Products', () => {
  describe('mapProducts', () => {
    let apiProduct: APIProduct
    let product: Product
    let apiProducts: APIProduct[]
    let expectedProducts: Product[]
    let existingIngredients: Ingredient[]

    const acai: Ingredient = {
      id: 1,
      name: 'Acai',
    }

    const cherry: Ingredient = {
      id: 2,
      name: 'Cherry',
    }

    const avocado: Ingredient = {
      id: 3,
      name: 'Avocado',
    }

    const banana: Ingredient = {
      id: 4,
      name: 'Banana',
    }

    beforeEach(() => {
      apiProduct = {
        id: 1,
        name: 'Acai + Cherry',
        collection: 'Smoothie',
        ingredientIds: [1, 2],
        image: {
          url: 'https://www.daily-harvest.com/static/img/products/01-acai/product-shot-ingredients.jpeg',
        },
      }

      product = {
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
      }

      existingIngredients = [
        acai,
        avocado,
        banana,
        cherry,
      ]
    })

    describe('when all ingredients exist', () => {
      beforeEach(() => {
        apiProducts = [apiProduct]
        expectedProducts = [product]
      })

      it('maps a list of APIProducts to Products', () => {
        const desiredIngredient: Ingredient = {
          id: 2,
          name: 'Cherry',
        }

        const actualProducts = mapAndFilterProducts(apiProducts, existingIngredients, desiredIngredient)
        expect(actualProducts).toEqual(expectedProducts)
      })
    })

    describe('when not all ingredients exist', () => {
      beforeEach(() => {
        apiProduct.ingredientIds = [1, 2, 5, 6]
        product.missingIngredients = [5, 6]

        apiProducts = [apiProduct]
        expectedProducts = [product]
      })
      it('maps a list of APIProducts to Products with the missingIngredients listed', () => {
        const desiredIngredient: Ingredient = {
          id: 2,
          name: 'Cherry',
        }

        const actualProducts = mapAndFilterProducts(apiProducts, existingIngredients, desiredIngredient)
        expect(actualProducts).toEqual(expectedProducts)
      })
    })

    describe('when products dont contain desired ingredient', () => {
      beforeEach(() => {
        const shouldntBtIncluded: APIProduct = {
          id: 2,
          name: 'Something else',
          collection: 'Smoothie',
          ingredientIds: [1, 3],
          image: {
            url: 'https://www.daily-harvest.com/static/img/products/01-acai/product-shot-ingredients.jpeg',
          },
        }

        apiProducts = [apiProduct, shouldntBtIncluded]
        expectedProducts = [product]
      })

      it('filters out the product that does not contain the ingredient', () => {
        const desiredIngredient: Ingredient = {
          id: 2,
          name: 'Cherry',
        }

        const actualProducts = mapAndFilterProducts(apiProducts, existingIngredients, desiredIngredient)
        expect(actualProducts).toEqual(expectedProducts)
      })
    })
  })
})
