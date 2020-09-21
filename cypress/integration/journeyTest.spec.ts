/// <reference types="cypress" />

context('Journey Test', () => {
  before(() => {
    cy.server()
    cy.route('GET', 'https://raw.githubusercontent.com/daily-harvest/opportunities/master/web-1/data/ingredients.json').as('getIngredients')

    cy.visit('')
    cy.wait('@getIngredients')
  })

  it('displays the title of the project', () => {
    expect(cy.contains('Welcome to the Food Finder'))
  })

  describe('entering a valid ingredient', () => {
    before(() => {
      cy.contains('div', 'Ingredient').find('input').first().type('Avocado').blur()

      cy.server()
      cy.route('GET', 'https://raw.githubusercontent.com/daily-harvest/opportunities/master/web-1/data/products.json').as('getProducts')

      cy.get('form').submit()
      cy.get('form').submit()
      cy.wait('@getProducts')
    })

    it('displays a list of products', () => {
      cy.contains('Cacao + Avocado').should('exist')
    })
  })
})
