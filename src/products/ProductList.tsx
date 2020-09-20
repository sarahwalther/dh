import React, { ReactElement } from 'react'
import { Product } from './Products'
import { ProductView } from './ProductView'
import { RootState } from '../reducers';
import { connect } from 'react-redux';

interface ProductListStateProps {
  products: Product[]
}

export const ProductList = (props: ProductListStateProps): ReactElement => (
  <div>
    {props.products.length > 0
      ? 'Here are a few delicious options to choose from' : ''
    }
    {props.products.map(product => <ProductView key={product.id} product={product}/>)}
  </div>
)

const mapStateToProps = (state: RootState): ProductListStateProps => ({
  products: state.productReducer.products,
})

export default connect(mapStateToProps)(ProductList)
