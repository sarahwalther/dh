import React, { ReactElement } from 'react'
import { Product } from './Products'
import { ProductView } from './ProductView'
import { RootState } from '../reducers'
import { connect } from 'react-redux'

interface ProductListStateProps {
  products: Product[]
}

export const ProductList = (props: ProductListStateProps): ReactElement => (
  <div className="container mt-4">
    <div className=".col-sm-2 .offset-md-2">
      {props.products.length > 0
        ? <h3>Here are a few delicious options to choose from</h3> : ''
      }
      {props.products.map(product => <ProductView key={product.id} product={product}/>)}
    </div>
  </div>
)

const mapStateToProps = (state: RootState): ProductListStateProps => ({
  products: state.productReducer.products,
})

export default connect(mapStateToProps)(ProductList)
