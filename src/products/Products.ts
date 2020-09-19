import { Ingredient, Ingredients } from '../ingredients/Ingredients'

export enum ProductCollection {
  Smoothie,
  Soup,
  'Chia Bowl',
  'Oat Bowl',
  Sundae,
  'Harvest Bowl',
  Lattes,
  Cookie,
  Bites,
}

export interface Product {
  id: number,
  name: string,
  collection: ProductCollection,
  ingredients: Ingredient[],
  image: {
    url: string
  },
  missingIngredients: number[]
}

export interface ProductState {
  products: Product[],
  productsCallFailed: boolean,
}

export interface APIProduct {
  id: number,
  name: string,
  collection: string,
  ingredientIds: number[],
  image: {
    url: string
  }
}

export const mapAndFilterProducts = (
  apiProducts: APIProduct[],
  ingredients: Ingredient[],
  desiredIngredient: Ingredient,
): Product[] => {
  const ingredientsMap: Ingredients = {}

  ingredients.forEach(ingredient => {
    ingredientsMap[ingredient.id] = ingredient.name
  })

  const products: Product[] = []

  for (let j = 0; j < apiProducts.length; j++) {
    const apiProduct = apiProducts[j]
    const missingIngredients: number[] = []

    const ingredients: Ingredient[] = []
    let containsIngredient = false

    for (let i = 0; i < apiProduct.ingredientIds.length; i++) {
      const id = apiProduct.ingredientIds[i]
      if (ingredientsMap[id] === undefined) {
        missingIngredients.push(id)
        continue
      }

      if (id === desiredIngredient.id) {
        containsIngredient = true
      }

      ingredients.push({
        id: id,
        name: ingredientsMap[id],
      })
    }

    if (containsIngredient) {
      products.push(
        {
          id: apiProduct.id,
          name: apiProduct.name,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          collection: ProductCollection[apiProduct.collection],
          ingredients,
          image: apiProduct.image,
          missingIngredients,
        },
      )
    }
  }

  return products
}
