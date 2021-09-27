// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('addComputer', (computerName,introDate,discontinuedDate,company) => {
    cy.visit('https://computer-database.herokuapp.com/computers/new')
    cy.enterComputerInfo(computerName,introDate,discontinuedDate,company)
    cy.get('input[value="Create this computer"]').click()
})

Cypress.Commands.add('enterComputerInfo',(computerName,introDate,discontinuedDate,company) =>{
    if(computerName != null)
        cy.get('#name').clear().type(computerName).should('have.value', computerName)
    if(introDate != null)
        cy.get('#introduced').clear().type(introDate).should('have.value', introDate)
    if(discontinuedDate != null)
        cy.get('#discontinued').clear().type(discontinuedDate).should('have.value', discontinuedDate)
    if(company != null)
        cy.get('#company').select(company)
})

Cypress.Commands.add('openEditComputerView', (computerName) => {
    cy.findComputer(computerName)
    cy.contains('a', computerName).click({force: true})
})

Cypress.Commands.add('deleteComputer',(computerName) =>{
    cy.openEditComputerView(computerName)
    cy.get('input[value="Delete this computer"]').click()
})

Cypress.Commands.add('findComputer', (computerName) =>{
    cy.visit('https://computer-database.herokuapp.com/computers')
    cy.get('input[name="f"]').type(computerName)
    cy.get('input[id="searchsubmit"]').click()
})

Cypress.Commands.add('checkDetailsOnEditPage', (computerName,introDate,discontinuedDate,company) =>{
    cy.openEditComputerView(computerName)
    if(computerName != null)
        cy.get('#name').should('have.value',computerName)
    if(introDate != null)
        cy.get('#introduced').should('have.value',introDate)
    if(discontinuedDate != null)
        cy.get('#discontinued').should('have.value',discontinuedDate)
    if(company != null)
        cy.get('#company').contains(company)
})

Cypress.Commands.add('deleteAllTestData',() =>{
    cy.findComputer('S0')
    cy.get('body').then(($a) => { 
        if ($a.text().includes('Nothing to display')) {
            //stop
        } else {
            cy.deleteComputer('S0')
             cy.deleteAllTestData()
        }
    })
})
