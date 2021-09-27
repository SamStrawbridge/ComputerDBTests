describe('Successfully updates a computers details',()=>{
    before(() => {
        cy.addComputer('S016',null,null,null)
      })
    beforeEach(() => {
        cy.openEditComputerView('S016')
    })
    after(() => {
        cy.deleteComputer('S017')
      })
    it('adds an introduced date', () =>{
        cy.enterComputerInfo(null,"2005-02-01",null,null)
        cy.get('input[value="Save this computer"]').click()
        cy.contains('Done! Computer S016 has been updated')
        cy.findComputer('S016')
        cy.contains('S016').parent('td').parent('tr').should('contain.text','01 Feb 2005')
        cy.checkDetailsOnEditPage('S016','2005-02-01',null,null)
    });
    it('adds a discontinued date', () =>{
        cy.enterComputerInfo(null,null,"2011-10-11",null)
        cy.get('input[value="Save this computer"]').click()
        cy.contains('Done! Computer S016 has been updated')
        cy.findComputer('S016')
        cy.contains('S016').parent('td').parent('tr').should('contain.text','01 Feb 2005')
        cy.contains('S016').parent('td').parent('tr').should('contain.text','11 Oct 2011')
        cy.checkDetailsOnEditPage('S016','2005-02-01',"2011-10-11",null)
    });
    it('adds a company', () =>{
        cy.enterComputerInfo(null,null,null,"Sony")
        cy.get('input[value="Save this computer"]').click()
        cy.contains('Done! Computer S016 has been updated')
        cy.findComputer('S016')
        cy.contains('S016').parent('td').parent('tr').should('contain.text','01 Feb 2005')
        cy.contains('S016').parent('td').parent('tr').should('contain.text','11 Oct 2011')
        cy.contains('S016').parent('td').parent('tr').should('contain.text','Sony')
        cy.checkDetailsOnEditPage('S016','2005-02-01',"2011-10-11","Sony")
    });
    it('changes the computer name, changes the dates and changes company', () =>{
        cy.enterComputerInfo("S017","2006-03-02","2012-11-12","Nintendo")
        cy.get('input[value="Save this computer"]').click()
        cy.contains('Done! Computer S017 has been updated')
        cy.findComputer('S017')
        cy.contains('S017').parent('td').parent('tr').should('contain.text','02 Mar 2006')
        cy.contains('S017').parent('td').parent('tr').should('contain.text','12 Nov 2012')
        cy.contains('S017').parent('td').parent('tr').should('contain.text','Nintendo')
        cy.checkDetailsOnEditPage("S017","2006-03-02","2012-11-12","Nintendo")
    });
})

describe('Attempts to update a computers with invalid details',()=>{
    before(() => {
        cy.addComputer('S018',null,null,null)
      })
    beforeEach(() => {
        cy.openEditComputerView('S018')
    })
    after(() => {
        cy.deleteComputer('S018')
      })
    it('Adds an invalid introduced date and discontinued date', () =>{
        cy.enterComputerInfo(null,"test","test",null)
        cy.get('input[value="Save this computer"]').click()
        cy.get('#introduced').parent().parent().should('have.class','error')
        cy.get('#discontinued').parent().parent().should('have.class','error')
    });
    it('Removes computer name', () =>{
        cy.enterComputerInfo(" ","test","test",null)
        cy.get('input[value="Save this computer"]').click()
        cy.get('#name').parent().parent().should('have.class','error')
    });
    it('Replaces name, introduced date and discontinued date for single space chatacter', () =>{
        cy.enterComputerInfo(" "," "," ",null)
        cy.get('input[value="Save this computer"]').click()
        cy.get('#name').parent().parent().should('have.class','error')
        cy.get('#introduced').parent().parent().should('have.class','error')
        cy.get('#discontinued').parent().parent().should('have.class','error')
    });
})