 describe('Successfully delete a computer', ()=>{
    after(() => {
        //remove all test data
        cy.deleteAllTestData()
      })
     it('Deletes a computer', () =>{
         //add a new computer
         cy.addComputer('S019',null,null,null)
         cy.contains('Done! Computer S019 has been created')
         cy.findComputer('S019')
         cy.get('tbody > tr > :nth-child(1)').should('contain.text','S019')
         cy.deleteComputer('S019')
         cy.contains('Done! Computer has been deleted')
         cy.findComputer('S019')
         cy.get('.well').should('contain.text','Nothing to display')
    });
    it('Deletes a computer when a duplicate is present', () =>{
        //add a new computer
        cy.addComputer('S019',null,null,null)
        cy.contains('Done! Computer S019 has been created')
        cy.addComputer('S019',null,null,null)
        cy.contains('Done! Computer S019 has been created')
        cy.findComputer('S019')
        cy.get('tbody > tr > :nth-child(1)').should('contain.text','S019')
        cy.deleteComputer('S019')
        cy.contains('Done! Computer has been deleted')
        cy.findComputer('S019')
        cy.get('tbody > tr > :nth-child(1)').should('contain.text','S019')
   });
})