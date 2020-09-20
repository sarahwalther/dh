import React, { ReactElement } from 'react'
import { Product, ProductCollection } from './Products'

interface ProductViewProps {
  product: Product
}

export const ProductView = (props: ProductViewProps): ReactElement => {
  return (<div>
    <h2>{props.product.name}</h2>
    <img src={props.product.image.url} alt="productImage"/>
    <p>Part of our Collection</p>
    <p>{ProductCollection[props.product.collection]}</p>
    <p>This amazing {ProductCollection[props.product.collection]} contains all of these delicious ingredients</p>
    <p>{props.product.ingredients.map(ingredient => ingredient.name).join(', ')}</p>
    <p>{props.product.missingIngredients.length > 0
      ? 'There might be a few extra ingredients that are not listed here' : ''
    }</p>
  </div>)
}
