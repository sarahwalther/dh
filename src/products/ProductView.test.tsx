import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import { Ingredient } from '../ingredients/Ingredients'
import { Product, ProductCollection } from './Products'
import { ProductView } from './ProductView'

describe('ProductView', () => {
  let productView: RenderResult
  let acaiCherrySmoothie: Product
  const acai: Ingredient = {
    id: 1,
    name: 'Acai',
  }

  const cherry: Ingredient = {
    id: 2,
    name: 'Cherry',
  }

  describe('when there are no missing products', () => {
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
      productView = render(<ProductView product={acaiCherrySmoothie}/>)
    })

    it('should display the product title', () => {
      expect(productView.getByText('Acai + Cherry')).toBeInTheDocument()
    })

    it('should display the image', () => {
      expect(productView.getByAltText('productImage')).toBeInTheDocument()
    })

    it('should display the type of product', () => {
      expect(productView.getByText('Smoothie')).toBeInTheDocument()
    })

    it('should display all the ingredients', () => {
      expect(productView.getByText('Acai, Cherry', { exact: false })).toBeInTheDocument()
    })

    it('should not display a warning message about missing ingredients if there are none', () => {
      expect(productView.queryByText('There might be a few extra ingredients that are not listed here')).toBeNull()
    })
  })

  describe('when there are missing products', () => {
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
        missingIngredients: [3],
      }
      productView = render(<ProductView product={acaiCherrySmoothie}/>)
    })

    it('should display a warning message about missing ingredients if there are none', () => {
      expect(productView.getByText('There might be a few extra ingredients that are not listed here')).toBeInTheDocument()
    })
  })
})
