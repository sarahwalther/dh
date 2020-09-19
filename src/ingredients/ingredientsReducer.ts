import { IngredientState } from './Ingredients'
import {
  IngredientActions,
  INGREDIENTS_CALL_FAILED,
  UPDATE_INGREDIENT_IS_VALID,
  UPDATE_INGREDIENTS, UPDATE_SELECTED_INGREDIENT,
} from './ingredientActions'

const initialState: IngredientState = {
  ingredients: [],
  selectedIngredient: undefined,
  ingredientIsValid: true,
  ingredientsCallFailed: false,
}

// TODO: Need to think about resetting

export const ingredientReducer = (
  state = initialState,
  action: IngredientActions,
): IngredientState => {
  switch (action.type) {
    case UPDATE_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
      }
    case UPDATE_SELECTED_INGREDIENT:
      return {
        ...state,
        selectedIngredient: action.ingredient,
      }
    case UPDATE_INGREDIENT_IS_VALID:
      return {
        ...state,
        ingredientIsValid: action.payload,
      }
    case INGREDIENTS_CALL_FAILED:
      return {
        ...state,
        ingredientsCallFailed: true,
      }
    default:
      return state
  }
}
