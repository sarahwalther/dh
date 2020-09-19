/// <reference types="cypress" />

context('Journey Test', () => {
  beforeEach(() => {
    cy.visit('')
  })

  it('displays the title of the project', () => {
    expect(cy.contains('Welcome to the Food finder'))
  })

  describe('entering an ingredient', () => {
    before(() => {
      cy.contains('div', 'Ingredient').find('input').first().type('Organic Kale')

      cy.get('form').contains('form', 'Find').submit()
    })
    it('displays a list of products', () => {
      // expect(cy)
    })
  })
})
