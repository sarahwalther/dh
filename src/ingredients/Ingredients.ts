export interface Ingredient {
  id: number,
  name: string,
}
export interface IngredientState {
  ingredients: Ingredient[],
  selectedIngredient: Ingredient | undefined,
  ingredientIsValid: boolean,
  ingredientsCallFailed: boolean,
}

// export interface Ingredient {
//   [id: number]: string
// }

export interface Ingredients {
  [id: number]: string
}
