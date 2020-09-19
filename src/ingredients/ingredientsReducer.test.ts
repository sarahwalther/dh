import {
  INGREDIENTS_CALL_FAILED,
  UPDATE_INGREDIENT_IS_VALID,
  UPDATE_INGREDIENTS, UPDATE_SELECTED_INGREDIENT,
  UpdateIngredientIsValidAction,
  UpdateIngredientsAction, UpdateIngredientsCallFailedAction, UpdateSelectedIngredientAction,
} from './ingredientActions'
import { Ingredient } from './Ingredients'
import { ingredientReducer } from './ingredientsReducer'

describe('IngredientsReducer', () => {
  let cherry: Ingredient
  let ingredients: Ingredient[]

  beforeEach(() => {
    cherry = {
      id: 1,
      name: 'Cherry',
    }

    ingredients = [cherry]
  })

  describe('UPDATE_INGREDIENTS', () => {
    it('updates the ingredients', () => {
      const action: UpdateIngredientsAction = {
        type: UPDATE_INGREDIENTS,
        ingredients: ingredients,
      }

      const updatedState = ingredientReducer(undefined, action)

      expect(updatedState.ingredients).toHaveLength(1)
      expect(updatedState.ingredients).toEqual(ingredients)
    })
  })

  describe('UPDATE_INGREDIENT_IS_VALID', () => {
    it('updates the ingredientsValid flag', () => {
      const action: UpdateIngredientIsValidAction = {
        type: UPDATE_INGREDIENT_IS_VALID,
        payload: false,
      }

      const updatedState = ingredientReducer(undefined, action)

      expect(updatedState.ingredientIsValid).toBeFalsy()
    })
  })

  describe('UPDATE_SELECTED_INGREDIENT', () => {
    it('updates the selected ingredient', () => {
      const action: UpdateSelectedIngredientAction = {
        type: UPDATE_SELECTED_INGREDIENT,
        ingredient: cherry,
      }

      const updatedState = ingredientReducer(undefined, action)

      expect(updatedState.selectedIngredient).toEqual(cherry)
    })
  })

  describe('INGREDIENTS_CALL_FAILED', () => {
    it('updates the ingredientsCallFailed flag', () => {
      const action: UpdateIngredientsCallFailedAction = {
        type: INGREDIENTS_CALL_FAILED,
      }

      const updatedState = ingredientReducer(undefined, action)

      expect(updatedState.ingredientsCallFailed).toBeTruthy()
    })
  })
})
