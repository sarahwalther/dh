import React from 'react'
import { render, fireEvent, RenderResult } from '@testing-library/react'
import { IngredientForm } from './IngredientForm'
import { Mock } from '../setupTests'
import { Ingredient } from './Ingredients'

describe('IngredientsForm', () => {
  let ingredientsForm: RenderResult
  let validateIngredientSpy: Mock
  let fetchIngredientsSpy: Mock
  let fetchProductsSpy: Mock
  let selectedIngredient: Ingredient

  beforeEach(() => {
    validateIngredientSpy = jest.fn()
    fetchIngredientsSpy = jest.fn()
    fetchProductsSpy = jest.fn()
    selectedIngredient = {
      id: 1,
      name: 'ingredient',
    }

    ingredientsForm = render(
      <IngredientForm
        ingredientIsValid={true}
        validateIngredient={validateIngredientSpy}
        fetchIngredients={fetchIngredientsSpy}
        fetchProducts={fetchProductsSpy}
        selectedIngredient={selectedIngredient}
      />,
    )
  })

  describe('on render', () => {
    it('should render an input field for ingredients', () => {
      expect(ingredientsForm.getByLabelText('Ingredient')).toBeInTheDocument()
    })

    it('should display a submit button', () => {
      const submitButton = ingredientsForm.getByText('Find')

      expect(submitButton).toBeInTheDocument()
    })

    it('should dispatch the fetchIngredients spy', () => {
      expect(fetchIngredientsSpy).toHaveBeenCalled()
    })
  })

  describe('when there is no text in the input', () => {
    let submitButton: HTMLElement

    beforeEach(() => {
      submitButton = ingredientsForm.getByText('Find')
    })

    it('should disable the submit button', () => {
      expect(submitButton).toBeDisabled()
    })
  })

  describe('when entering a valid input', () => {
    let submitButton: HTMLElement

    beforeEach(() => {
      const input = ingredientsForm.getByLabelText('Ingredient')
      fireEvent.change(input, { target: { value: 'ingredient' } })
      fireEvent.blur(input)

      submitButton = ingredientsForm.getByText('Find')
    })

    describe('on blur', () => {
      it('should validate the input', () => {
        expect(validateIngredientSpy).toHaveBeenCalledWith('ingredient')
      })
    })

    it('enables the submit button', () => {
      expect(submitButton).not.toBeDisabled()
    })

    it('dispatches the thing', () => {
      submitButton.click()

      expect(fetchProductsSpy).toHaveBeenCalledWith(selectedIngredient)
    })
  })

  // describe('when entering an ingredient that does not exist', () => {
  //
  // })
  //
  // describe('when entering a lower case ingredient', () => {
  //
  // })
})
