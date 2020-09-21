import React, { ChangeEvent, Component, FormEvent, ReactElement } from 'react'
import { Ingredient } from './Ingredients'
import { connect } from 'react-redux'
import { fetchIngredients, validateAndSelectIngredient } from './ingredientActions'
import { fetchProducts } from '../products/productActions'
import { RootState } from '../reducers'
import { DHDispatch } from '../store'

interface IngredientFormState {
  submitDisabled: boolean,
  inputValue: string,
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
      <div className="container mt-4">
        <div className=".col-sm-2 .offset-md-2">
          <h3>Find delicious options containing your favorite ingredients!</h3>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="ingredient">
                Ingredient
              </label>
              <input
                type="text"
                name="ingredient"
                id="ingredient"
                className="form-control invalid"
                value={this.state.inputValue}
                onChange={this.onChange}
                onBlur={this.validate}
                required
              />
            </div>
            <input
              type="submit"
              value="Find"
              className="btn btn-primary form-group"
              disabled={this.state.submitDisabled}
            />
          </form>
          <p>{this.props.ingredientIsValid ? '' : `Aw snap! It looks like we don't have anything delicious containing ${this.state.inputValue} yet. Maybe try something else?`}</p>
        </div>
      </div>
    )
  }

  onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault()
    this.setState({
      submitDisabled: event.target.value === '',
      inputValue: event.target.value,
    })
  }

  validate = (): void => {
    this.props.validateIngredient(this.state.inputValue)
  }

  handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    this.validate()
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
