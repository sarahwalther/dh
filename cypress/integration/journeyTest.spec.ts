/// <reference types="cypress" />

context('Journey Test', () => {
    beforeEach(() => {
        cy.visit('')
    })

    it('displays the Learn React link', () => {
        expect(cy.contains('Learn React'))
    })
})
