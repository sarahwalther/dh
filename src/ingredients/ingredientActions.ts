import { ActionCreator, Dispatch } from 'redux'
import { AxiosResponse, AxiosInstance } from 'axios'
import { Ingredient } from './Ingredients'
import { DHGetState, DHThunk } from '../store'
import { getAxiosInstance } from './httpClient'
import pluralize from 'pluralize'

export const INGREDIENTS_CALL_FAILED = 'INGREDIENTS_CALL_FAILED'
export const UPDATE_INGREDIENT_IS_VALID = 'UPDATE_INGREDIENT_IS_VALID'
export const UPDATE_INGREDIENTS = 'UPDATE_INGREDIENTS'
export const UPDATE_SELECTED_INGREDIENT = 'UPDATE_SELECTED_INGREDIENT'

export interface UpdateSelectedIngredientAction {
  type: typeof UPDATE_SELECTED_INGREDIENT,
  ingredient: Ingredient,
}

export interface UpdateIngredientsAction {
  type: typeof UPDATE_INGREDIENTS
  ingredients: Ingredient[]
}

export interface UpdateIngredientIsValidAction {
  type: typeof UPDATE_INGREDIENT_IS_VALID
  payload: boolean
}

export interface UpdateIngredientsCallFailedAction {
  type: typeof INGREDIENTS_CALL_FAILED,
}

export type IngredientActions = UpdateIngredientsAction | UpdateSelectedIngredientAction | UpdateIngredientIsValidAction | UpdateIngredientsCallFailedAction

const updateSelectedIngredientAction = (ingredient: Ingredient): UpdateSelectedIngredientAction => {
  return {
    type: UPDATE_SELECTED_INGREDIENT,
    ingredient,
  }
}

const updateIngredientsAction = (ingredients: Ingredient[]): UpdateIngredientsAction => {
  return {
    type: UPDATE_INGREDIENTS,
    ingredients,
  }
}

const updateIngredientIsValidAction = (isValid: boolean): UpdateIngredientIsValidAction => {
  return {
    type: UPDATE_INGREDIENT_IS_VALID,
    payload: isValid,
  }
}

const updateCallFailedAction = (): UpdateIngredientsCallFailedAction => {
  return {
    type: INGREDIENTS_CALL_FAILED,
  }
}

export const validateAndSelectIngredient: ActionCreator<DHThunk> = (
  ingredient: string,
) => (
  dispatch: Dispatch,
  getState: DHGetState,
): void => {
  const ingredientFound = getState().ingredientReducer.ingredients.find(
    availableIngredient => {
      const singularLowerCaseIngredient = pluralize.singular(ingredient.toLowerCase())
      return availableIngredient.name.toLowerCase() === singularLowerCaseIngredient
    })

  dispatch(updateIngredientIsValidAction(ingredientFound !== undefined))
  if (ingredientFound !== undefined) {
    dispatch(updateSelectedIngredientAction(ingredientFound))
  }
}

export const fetchIngredients: ActionCreator<DHThunk> = (httpClient: AxiosInstance = getAxiosInstance()) => async (
  dispatch: Dispatch,
): Promise<void> => {
  try {
    const response: AxiosResponse = await httpClient.get('/web-1/data/ingredients.json')
    const ingredients: Ingredient[] = response.data
    dispatch(updateIngredientsAction(ingredients))
  } catch (err) {
    dispatch(updateCallFailedAction())
  }
}
