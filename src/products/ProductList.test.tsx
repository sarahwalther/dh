import React from 'react'
import { RenderResult, render } from '@testing-library/react'
import { Product, ProductCollection } from './Products'
import { Ingredient } from '../ingredients/Ingredients'
import { ProductList } from './ProductList'

describe('ProductList', () => {
  describe('ProductView', () => {
    let productList: RenderResult
    let bananaCherrySmoothie: Product
    let acaiCherrySmoothie: Product
    const acai: Ingredient = {
      id: 1,
      name: 'Acai',
    }

    const cherry: Ingredient = {
      id: 2,
      name: 'Cherry',
    }

    const banana: Ingredient = {
      id: 3,
      name: 'Banana',
    }

    describe('when there are products', () => {
      beforeEach(() => {
        acaiCherrySmoothie = {
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

        bananaCherrySmoothie = {
          id: 2,
          name: 'Banana + Cherry',
          collection: ProductCollection.Smoothie,
          ingredients: [
            banana,
            cherry,
          ],
          image: {
            url: 'https://www.daily-harvest.com/static/img/products/01-acai/product-shot-ingredients.jpeg',
          },
          missingIngredients: [],
        }

        productList = render(<ProductList products={[acaiCherrySmoothie, bananaCherrySmoothie]}/>)
      })

      it('should display the header', () => {
        expect(productList.getByText('Here are a few delicious options to choose from')).toBeInTheDocument()
      })

      it('should render a ProductView for each product', () => {
        expect(productList.getByText('Acai + Cherry')).toBeInTheDocument()
        expect(productList.getByText('Banana + Cherry')).toBeInTheDocument()
      })
    })

    describe('when there are no products', () => {
      beforeEach(() => {
        productList = render(<ProductList products={[]}/>)
      })

      it('should not display the header', () => {
        expect(productList.queryByText('Here are a few delicious options to choose from')).toBeNull()
      })
    })
  })
})
