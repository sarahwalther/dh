import axios, { AxiosInstance } from 'axios'
import moxios from 'moxios'
import { DispatchExts, setupMockStore } from '../setupTests'
import { Ingredient } from './Ingredients'
import { MockStoreEnhanced } from 'redux-mock-store'
import { RootState } from '../reducers'
import {
  INGREDIENTS_CALL_FAILED,
  fetchIngredients,
  UPDATE_INGREDIENT_IS_VALID,
  UPDATE_INGREDIENTS,
  UpdateIngredientsCallFailedAction,
  UpdateIngredientIsValidAction,
  UpdateIngredientsAction,
  validateAndSelectIngredient, UPDATE_SELECTED_INGREDIENT, UpdateSelectedIngredientAction,
} from './ingredientActions'

describe('IngredientActions', () => {
  const fakeAxios: AxiosInstance = axios.create({ baseURL: 'test.com' })
  let store: MockStoreEnhanced<RootState, DispatchExts>
  const avodado = {
    id: 1,
    name: 'Avocado',
  }

  const grape = {
    id: 1,
    name: 'Grape',
  }

  const tomato = {
    id: 1,
    name: 'Tomato',
  }

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    moxios.install(fakeAxios)

    store = setupMockStore(
      {
        ingredientReducer: {
          ingredients: [avodado, grape],
          selectedIngredient: undefined,
          ingredientIsValid: true,
          ingredientsCallFailed: false,
        },
      },
    )
  })

  afterEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    moxios.uninstall(fakeAxios)
  })

  describe('validate and select ingredient', () => {
    describe('when the ingredient does not exist', () => {
      it('should dispatch the UPDATE_INGREDIENT_IS_VALID action with false', () => {
        const expectedAction: UpdateIngredientIsValidAction = {
          type: UPDATE_INGREDIENT_IS_VALID,
          payload: false,
        }

        store.dispatch(validateAndSelectIngredient('NotAnIngredient'))
        const actionsCalled = store.getActions()

        expect(actionsCalled[0]).toEqual(expectedAction)
      })

      it('should not dispatch the UPDATE_SELECTED_INGREDIENT action', () => {
        store.dispatch(validateAndSelectIngredient('NotAnIngredient'))
        const actionsCalled = store.getActions()

        expect(actionsCalled[1]).toEqual(undefined)
      })
    })

    describe('when the ingredient does exist', () => {
      it('should dispatch the UPDATE_INGREDIENT_IS_VALID action with true', () => {
        const expectedAction: UpdateIngredientIsValidAction = {
          type: UPDATE_INGREDIENT_IS_VALID,
          payload: true,
        }

        store.dispatch(validateAndSelectIngredient('Avocado'))
        const actionsCalled = store.getActions()

        expect(actionsCalled[0]).toEqual(expectedAction)
      })

      it('should dispatch the UPDATE_SELECTED_INGREDIENT action', () => {
        const expectedAction: UpdateSelectedIngredientAction = {
          type: UPDATE_SELECTED_INGREDIENT,
          ingredient: avodado,
        }

        store.dispatch(validateAndSelectIngredient('Avocado'))
        const actionsCalled = store.getActions()

        expect(actionsCalled[1]).toEqual(expectedAction)
      })
    })
  })

  describe('successful call to get ingredients', () => {
    describe('fetchIngredients', () => {
      const ingredients: Ingredient[] = [tomato, avodado]
      beforeEach(() => {
        moxios.stubRequest('/web-1/data/ingredients.json', {
          status: 200,
          response: ingredients,
        })
      })

      it('should dispatch the UPDATE_INGREDIENTS action', async () => {
        const expectedAction: UpdateIngredientsAction = {
          type: UPDATE_INGREDIENTS,
          ingredients,
        }

        await store.dispatch(fetchIngredients(fakeAxios))
        const actionsCalled = store.getActions()

        expect(actionsCalled[0]).toEqual(expectedAction)
      })
    })
  })

  describe('unsuccessful call to get ingredients', () => {
    beforeEach(() => {
      moxios.stubRequest('/web-1/data/ingredients.json', {
        status: 400,
        response: { message: 'invalid data' },
      })
    })

    it('dispatches an error message', async () => {
      const expectedAction: UpdateIngredientsCallFailedAction = {
        type: INGREDIENTS_CALL_FAILED,
      }

      await store.dispatch(fetchIngredients(fakeAxios))
      const actionsCalled = store.getActions()

      expect(actionsCalled[0]).toEqual(expectedAction)
    })
  })
})
