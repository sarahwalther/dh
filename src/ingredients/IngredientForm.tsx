import React, { ChangeEvent, Component, FormEvent, ReactElement } from 'react'
import { Ingredient } from './Ingredients'
import { connect } from 'react-redux'
import { fetchIngredients, validateAndSelectIngredient } from './ingredientActions'
import { fetchProducts } from '../products/productActions'
import { RootState } from '../reducers'
import { DHDispatch } from '../store'

interface IngredientFormState {
  submitDisabled: boolean,
  inputValue: string
}

interface IngredientFormStateProps {
  ingredientIsValid: boolean,
  selectedIngredient: Ingredient | undefined
}

interface IngredientFormDispatchProps {
  validateIngredient(ingredient: string): void
  fetchIngredients(): void
  fetchProducts(ingredient: Ingredient): void
}

export class IngredientForm extends Component<IngredientFormStateProps & IngredientFormDispatchProps, IngredientFormState> {
  constructor(props: IngredientFormStateProps & IngredientFormDispatchProps) {
    super(props)
    this.state = {
      submitDisabled: true,
      inputValue: '',
    }
    props.fetchIngredients()
  }

  render(): ReactElement {
    return (
      <form onSubmit={this.submit}>
        <label>
          Ingredient
          <input
            type="text"
            name="ingredient"
            value={this.state.inputValue}
            onChange={this.onChange}
            onBlur={this.validate}
          />
        </label>
        <input type="submit" value="Find" disabled={this.state.submitDisabled}/>
      </form>
    )
  }

  onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      submitDisabled: event.target.value === '',
      inputValue: event.target.value,
    })
  }

  validate = (): void => {
    this.props.validateIngredient(this.state.inputValue)
  }

  submit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    if (this.props.selectedIngredient !== undefined) {
      this.props.fetchProducts(this.props.selectedIngredient)
    }
  }
}

const mapDispatchToProps = (dispatch: DHDispatch): IngredientFormDispatchProps => ({
  validateIngredient: (ingredient: string): void => dispatch(validateAndSelectIngredient(ingredient)),
  fetchIngredients: (): void => dispatch(fetchIngredients()),
  fetchProducts: (ingredient: Ingredient): void => dispatch(fetchProducts(ingredient)),
})

const mapStateToProps = (state: RootState): IngredientFormStateProps => ({
  ingredientIsValid: state.ingredientReducer.ingredientIsValid,
  selectedIngredient: state.ingredientReducer.selectedIngredient,
})

export default connect(mapStateToProps, mapDispatchToProps)(IngredientForm)
