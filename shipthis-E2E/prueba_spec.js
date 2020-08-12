describe('test_name', function() {

  it('what_it_does', function() {
 
     cy.viewport(1920, 937)
  
     cy.visit('https://docs.cypress.io/guides/getting-started/testing-your-app.html#Step-1-Start-your-server')
  
     cy.get('#content-wrap > #content > #content-inner > .article-wrapper > #article').click()
  
     cy.get('#header-inner > #main-nav > ul > li:nth-child(2) > .main-nav-link').click()
  
     cy.get('#content-inner > #sidebar > ul > .sidebar-title:nth-child(2) > strong').click()
  
     cy.get('ul > .sidebar-title > .sidebar-links > .sidebar-li-getting-started:nth-child(2) > .sidebar-link').click()
  
     cy.visit('https://docs.cypress.io/guides/overview/why-cypress.html')
  
  })
 
 })
 