describe('Sign Up', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('Adds person to course', () => {
    // cy.visit('/')
    cy.wait(1200) // loadPeople apit to fetch data

    cy.get('input[name="name"]')
      .click()
      .type('Some Name')
      .should('have.value', 'Some Name')

    cy.get('input[name="email"]')
      .click()
      .type('some@email.com')

    cy.get('select[name="department"]')
      .select('core')
      .should('have.value', 'core');
     /* 
     function apiClient(department) {
        return {
          then: function(cb) {
            setTimeout(() => {
              cb(Courses[department]);
            }, 1000);
          }
        };
      }
     
     */ 
    cy.wait(1200) // another 200 ms for render 

    cy.get('select[name="course"]')
      .select('git-it')
      .should('have.value', 'git-it')

    cy.get('input[type="submit"]')
      .click()

    //   savePeople: function(people) {
    //     return new Promise((resolve, reject) => {
    //       setTimeout(() => {
    //         localStorage.people = JSON.stringify(people);
    //         return resolve({success: true});
    //       }, between(3500, 4500));
    //     });
    //   }
    // };
    
    // function between (min, max) {
    //   return Math.random() * (max - min) + min
    // }
    cy.wait(4700) // save people api 

    cy.get('li')
      .should('contain', 'Some Name - some@email.com - core - git-it')
  })
})


/* 
   I could be using  the aproach below if it were a network call

    cy.intercept('/activities/*', { fixture: 'activities' }).as('getActivities')
    cy.intercept('/messages/*', { fixture: 'messages' }).as('getMessages')

    // visit the dashboard, which should make requests that match
    // the two routes above
    cy.visit('http://localhost:8888/dashboard')

    // pass an array of Route Aliases that forces Cypress to wait
    // until it sees a response for each request that matches
    // each of these aliases
    cy.wait(['@getActivities', '@getMessages'])

    // these commands will not run until the wait command resolves above
    cy.get('h1').should('contain', 'Dashboard')
*/