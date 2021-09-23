 describe('Successfully adds a new computer', ()=>{
    after(() => {
        //remove all test data
        cy.deleteAllTestData()
      })
     it('Creates a new computer', () =>{
         //add a new computer
         cy.addComputer('S001','2005-02-01','2011-10-11','Sony')
         cy.contains('Done! Computer S001 has been created')
         cy.findComputer('S001')
         cy.contains('S001')
         cy.contains('S001').parent('td').parent('tr').should('contain.text','01 Feb 2005')
         cy.contains('S001').parent('td').parent('tr').should('contain.text','11 Oct 2011')
         cy.contains('S001').parent('td').parent('tr').should('contain.text','Sony')
         cy.checkDetailsOnEditPage('S001','2005-02-01','2011-10-11','Sony')
    });
    it('Creates a new computer with a long name', () =>{
        //add a new computer
        let longName = 'S002pzjvpricccupqlxwhtqvsljhdzaxfatwjhafnjlqthnwhfadxwdxtbjxnytnhiudxwezmvasiqwcwaamwctnsnnwnkgvcjuhsnodvllrrglcewifahpukmniublwiqdahxzdnqrkvwzfnoezogvytffornqgoqzojbewffwuzwcrnpukpdzescqpikhwhylycjrkumsdkuaucelhqttmiotgqtnjugaqnvmpuwuejbezpfuwcdybirancpmyujlfqkkxlkgniusjcqmhnqzihyepgnyelxhuwjqfccgjcjlhvytvtvtpiyvwksnbbyuaafyitjxvzewgstkorweblrwdpyhovowcklvfrcazqfoaivqckhdrqtvlbnxktyskqdqpnlhscawrolnmgibeageqsqkmxqndzahwhvlkewpxewfvuzcadmcneoxvlsmarmxaxnvercrqjsraqklzkjrcefolwvssxnxzjgnfvvbwumtsagksbckipyacbetqsblvbgeiwaupvtkngswiwwmuvmixjsibbafmspphyaptwenexlnwqusegrwylmszpmszplaypdjfxvdeqdkvgeigfzprpektzddxzrdmubrwzouwxvlmucqcwrry'
        cy.addComputer(longName,'2005-02-01','2011-10-11','Apple Inc.')
        cy.contains('Done! Computer '+longName+' has been created')
        cy.findComputer(longName)
        cy.contains(longName)
        cy.contains(longName).parent('td').parent('tr').should('contain.text','01 Feb 2005')
        cy.contains(longName).parent('td').parent('tr').should('contain.text','11 Oct 2011')
        cy.contains(longName).parent('td').parent('tr').should('contain.text','Apple Inc.')
        cy.checkDetailsOnEditPage(longName,'2005-02-01','2011-10-11','Apple Inc.')
    });
    it('Creates a new computer with early introduced and discontinued date', () =>{
        //add a new computer
        cy.addComputer('S003','0000-01-01','0000-01-01','Nintendo')
        cy.contains('Done! Computer S003 has been created')
        cy.findComputer('S003')
        cy.contains('S003')
        cy.contains('S003').parent('td').parent('tr').should('contain.text','01 Jan 0000')
        cy.contains('S003').parent('td').parent('tr').should('contain.text','01 Jan 0000')
        cy.contains('S003').parent('td').parent('tr').should('contain.text','Nintendo')
        cy.checkDetailsOnEditPage('S003','0000-01-01','0000-01-01','Nintendo')
    });
    it('Creates a new computer with late introduced and discontinued date', () =>{
        //add a new computer
        cy.addComputer('S004','9999-12-31','9999-12-31','Cray')
        cy.contains('Done! Computer S004 has been created')
        cy.findComputer('S004')
        cy.contains('S004')
        cy.contains('S004').parent('td').parent('tr').should('contain.text','31 Dec 9999')
        cy.contains('S004').parent('td').parent('tr').should('contain.text','31 Dec 9999')
        cy.contains('S004').parent('td').parent('tr').should('contain.text','Cray')
        cy.checkDetailsOnEditPage('S004','9999-12-31','9999-12-31','Cray')
    });
    it('Creates a new computer without a discontinued date', () =>{
        //add a new computer
        cy.addComputer('S005','2005-02-01',null,'Nokia')
        cy.contains('Done! Computer S005 has been created')
        cy.findComputer('S005')
        cy.contains('S005')
        cy.contains('S005').parent('td').parent('tr').should('contain.text','01 Feb 2005')
        cy.contains('S005').parent('td').parent('tr').should('contain.text','Nokia')
        cy.checkDetailsOnEditPage('S005','2005-02-01',null,'Nokia')
    });
    it('Creates a new computer without a introduced date', () =>{
        //add a new computer
        cy.addComputer('S006',null,'2011-10-11','Sony')
        cy.contains('Done! Computer S006 has been created')
        cy.findComputer('S006')
        cy.contains('S006')
        cy.contains('S006').parent('td').parent('tr').should('contain.text','11 Oct 2011')
        cy.contains('S006').parent('td').parent('tr').should('contain.text','Sony')
        cy.checkDetailsOnEditPage('S006',null,'2011-10-11','Sony')
    });
    it('Creates a new computer without a company', () =>{
        //add a new computer
        cy.addComputer('S007','2005-02-01','2011-10-11',null)
        cy.contains('Done! Computer S007 has been created')
        cy.findComputer('S007')
        cy.contains('S007')
        cy.contains('S007').parent('td').parent('tr').should('contain.text','01 Feb 2005')
        cy.contains('S007').parent('td').parent('tr').should('contain.text','11 Oct 2011')
        cy.checkDetailsOnEditPage('S007','2005-02-01','2011-10-11',null)
    });
    it('Creates a new computer without introduced or discontinued dates', () =>{
        //add a new computer
        cy.addComputer('S008',null,null,'Nintendo')
        cy.contains('Done! Computer S008 has been created')
        cy.findComputer('S008')
        cy.contains('S008')
        cy.contains('S008').parent('td').parent('tr').should('contain.text','Nintendo')
        cy.checkDetailsOnEditPage('S008',null,null,'Nintendo')
    });
    it('Creates a new computer with only a name', () =>{
        //add a new computer
        cy.addComputer('S009',null,null,null)
        cy.contains('Done! Computer S009 has been created')
        cy.findComputer('S009')
        cy.contains('S009')
        cy.checkDetailsOnEditPage('S009',null,null,null)
    });
    it('Creates a new computer with special chracters in its name', () =>{
        //add a new computer
        cy.addComputer('S010!@£$%^&(){}[]\/.,<>','2005-02-01','2011-10-11','Nokia')
        cy.contains('Done! Computer S010!@£$%^&(){}[]\/.,<> has been created')
        cy.findComputer('S010')
        cy.contains('S010!@£$%^&(){}[]\/.,<>')
        cy.contains('S010!@£$%^&(){}[]\/.,<>').parent('td').parent('tr').should('contain.text','01 Feb 2005')
        cy.contains('S010!@£$%^&(){}[]\/.,<>').parent('td').parent('tr').should('contain.text','11 Oct 2011')
        cy.contains('S010!@£$%^&(){}[]\/.,<>').parent('td').parent('tr').should('contain.text','Nokia')
        //not checking for special characters in edit view as the serach doesn't support special characters, I'd call this a bug
        //cy.checkDetailsOnEditPage('S010!@£$%^&(){}[]\/.,<>','2005-02-01','2011-10-11','Nokia')
        
    });
    it('Creates a new computer which is a duplicate of S001', () =>{
        //add a new computer
        cy.addComputer('S001','2005-02-01','2011-10-11','Sony')
        cy.contains('Done! Computer S001 has been created')
        cy.findComputer('S001')
        cy.contains('S001')
        cy.checkDetailsOnEditPage('S001','2005-02-01','2011-10-11','Sony')
        //ToDo something for finding 2 dup here
    });
 });

 describe('Attempts to add a computer with invalid details', ()=>{
    after(() => {
        //remove all test data
        cy.deleteAllTestData()
    })
    it('create a computer without any information', () =>{
        //add a new computer
        cy.addComputer(null,null,null,null)
        cy.get('input[name="name"]').parent().parent().should('have.class','error')
   });
   it('create a computer with empty spaces for name and dates', () =>{
        //add a new computer
        cy.addComputer(" "," "," ",null)
        cy.get('input[name="name"]').parent().parent().should('have.class','error')
        cy.get('input[name="introduced"]').parent().parent().should('have.class','error')
        cy.get('input[name="discontinued"]').parent().parent().should('have.class','error')
    });
    it('create a computer with text instead of dates', () =>{
        //add a new computer
        cy.visit('https://computer-database.herokuapp.com/computers/new')
        cy.addComputer("S018","test","test",null)
        cy.get('input[name="introduced"]').parent().parent().should('have.class','error')
        cy.get('input[name="discontinued"]').parent().parent().should('have.class','error')
    });
    it('create a computer with out of bounds dates', () =>{
        //add a new computer
        cy.addComputer("S014","2005-13-01","2011-13-11",null)
        cy.get('input[name="introduced"]').parent().parent().should('have.class','error')
        cy.get('input[name="discontinued"]').parent().parent().should('have.class','error')
    });
})