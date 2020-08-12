describe('ordersheet', function() {
  describe('Realización de orden', function() {
    it('PRUEBA 26 - Información no válida en alguno de los pasos de envío', function() {
  
      cy.viewport(1920, 937)
    
      cy.visit('http://staging-shipthis.herokuapp.com/')
    
      cy.get('#Banner > .col > .row > .col > .font-weight-medium:nth-child(1)').click()
    
      cy.get('#sections-list > .v-list-item > div > div > .sections-list__item').click()
    
      cy.get('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot > #input-89').click()
    
      cy.get('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot > #input-89').type('dg@gmail.com')
    
      cy.get('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot > #Password').click()
    
      cy.get('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot > #Password').type('123456')
    
      cy.get('.ma-0 > .v-card__text > .v-form > .v-btn > .v-btn__content').click()

      cy.wait(10000)

      cy.get('.row > .dashboard-list > .ma-2:nth-child(3) > .pa-4 > .dashboard-card__image').click()
    
      cy.get('.row:nth-child(2) > .col > .primary > .v-btn__content > .v-icon').click()
      cy.get('.v-form > .v-snack:nth-child(5) > .v-snack__wrapper > .v-snack__action > .v-btn > .v-btn__content > .v-icon').should('be.visible')
      cy.get('.v-form > .v-snack:nth-child(5) > .v-snack__wrapper > .v-snack__action > .v-btn > .v-btn__content > .v-icon').click()
      cy.get('.v-stepper__wrapper > .container > .v-form > .container > h4').should(($r)=>{
        expect($r).to.contain('Order type')
      })
      cy.wait(3000)
      
      cy.get('.v-input--has-state > .v-input__control > .v-input__slot > .v-select__slot > .v-select__selections').click()
      
      cy.get('#app > .v-menu__content > #list-159 > #list-item-243-0 > .v-list-item__content').click()
    
      cy.get('.row > .col-md-12 > .row > .v-btn > .v-btn__content').click()
    
      cy.get('.v-card__text > .v-list:nth-child(5) > .v-list-item > .v-list-item__title > h4').click()
    
      cy.get('.v-input__slot > .v-input--radio-group__input > .v-radio:nth-child(1) > .v-input--selection-controls__input > .v-input--selection-controls__ripple').click()
    
      cy.get('.container:nth-child(1) > div > .row > .v-btn > .v-btn__content').click()
    
      cy.get('.v-dialog__content:nth-child(6) > .v-dialog > .v-card > .v-card__text > .v-list:nth-child(8) > .v-list-item > .v-list-item__title > h4').click()
    
      cy.get('.container > div > .row > .ma-2 > .v-btn__content').click()
    
      cy.get('.row > .col-sm-12 > div > .container > .mb-0').click()
    
      cy.get('.row:nth-child(2) > .col > .primary > .v-btn__content > .mt-3').click()
    
      cy.get('.container:nth-child(1) > .row:nth-child(3) > .col:nth-child(3) > .primary > .v-btn__content > .v-icon').click()
      
      cy.get('.container:nth-child(1) > .v-snack > .v-snack__wrapper > .v-snack__action > .v-btn > .v-btn__content > .v-icon').should('be.visible')
      cy.get('.container:nth-child(1) > .v-snack > .v-snack__wrapper > .v-snack__action > .v-btn > .v-btn__content > .v-icon').click()
      cy.get('.v-stepper__items > .v-stepper__content > .v-stepper__wrapper > .container > h4').should(($r)=>{
        expect($r).to.contain('Configure packages')
      })
      cy.get('.v-stepper__content > .v-stepper__wrapper > .container > .container > .mb-2').click()
    
      cy.get('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot > #input-321').click()
    
      cy.get('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot > #input-321').type('34')
    
      cy.get('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot > #input-324').click()
    
      cy.get('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot > #input-324').type('34')
    
      cy.get('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot > #input-327').click()
    
      cy.get('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot > #input-327').type('34')
    
      cy.get('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot > #input-330').click()
    
      cy.get('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot > #input-330').type('34')
      
      cy.get('.v-expansion-panel-content__wrap > .row > .d-flex > .v-input > .v-input__control > .v-input__slot > .v-select__slot > .v-input__append-inner > .v-input__icon').click()
    
      cy.get('body > #app > .v-menu__content > #list-333 > #list-item-343-2').click()
    
      cy.get('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot > #input-338').click()
    
      cy.get('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot > #input-338').type('fg')
    
      cy.get('.container:nth-child(1) > .row:nth-child(3) > .col:nth-child(3) > .primary > .v-btn__content > .mt-3').click()
      cy.wait(7000)
        cy.get('.container:nth-child(2) > .row > .col:nth-child(3) > .primary > .v-btn__content > .mt-3').click()
        cy.wait(12000)
        cy.get('#Sidebar > .no-radius > .v-navigation-drawer__content > .v-list > .sidebar-item:nth-child(6)').click()
    })

    it('PRUEBA 27 -  Información válida en pasos previos al envío', function() {
  
      cy.viewport(1920, 937)
    
      cy.visit('http://staging-shipthis.herokuapp.com/')
    
      cy.get('#Banner > .col > .row > .col > .font-weight-medium:nth-child(1)').click()
    
      cy.get('#sections-list > .v-list-item > div > div > .sections-list__item').click()
    
      cy.get('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot > #input-89').click()
    
      cy.get('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot > #input-89').type('dg@gmail.com')
    
      cy.get('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot > #Password').click()
    
      cy.get('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot > #Password').type('123456')
    
      cy.get('.ma-0 > .v-card__text > .v-form > .v-btn > .v-btn__content').click()

      cy.wait(10000)

      cy.get('.row > .dashboard-list > .ma-2:nth-child(3) > .pa-4 > .dashboard-card__image').click()
      cy.get('.row:nth-child(2) > .col > .primary > .v-btn__content > .v-icon').click()
      cy.get('.v-form > .v-snack:nth-child(5) > .v-snack__wrapper > .v-snack__action > .v-btn > .v-btn__content > .v-icon').click()
      cy.wait(3000)
      cy.get('.v-input--has-state > .v-input__control > .v-input__slot > .v-select__slot > .v-select__selections').click()
      
      cy.get('#app > .v-menu__content > #list-159 > #list-item-243-0 > .v-list-item__content').click()
    
      cy.get('.row > .col-md-12 > .row > .v-btn > .v-btn__content').click()
    
      cy.get('.v-card__text > .v-list:nth-child(5) > .v-list-item > .v-list-item__title > h4').click()
    
      cy.get('.v-input__slot > .v-input--radio-group__input > .v-radio:nth-child(1) > .v-input--selection-controls__input > .v-input--selection-controls__ripple').click()
    
      cy.get('.container:nth-child(1) > div > .row > .v-btn > .v-btn__content').click()
    
      cy.get('.v-dialog__content:nth-child(6) > .v-dialog > .v-card > .v-card__text > .v-list:nth-child(8) > .v-list-item > .v-list-item__title > h4').click()
    
      cy.get('.container > div > .row > .ma-2 > .v-btn__content').click()
    
      cy.get('.row > .col-sm-12 > div > .container > .mb-0').click()
    
      cy.get('.row:nth-child(2) > .col > .primary > .v-btn__content > .mt-3').click()
      cy.get('.v-stepper__items > .v-stepper__content > .v-stepper__wrapper > .container > h4').should(($r)=>{
        expect($r).to.contain('Configure packages')
      })
      cy.get('.v-stepper__content > .v-stepper__wrapper > .container > .container > .mb-2').click()
    
      cy.get('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot > #input-321').click()
    
      cy.get('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot > #input-321').type('34')
    
      cy.get('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot > #input-324').click()
    
      cy.get('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot > #input-324').type('34')
    
      cy.get('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot > #input-327').click()
    
      cy.get('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot > #input-327').type('34')
    
      cy.get('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot > #input-330').click()
    
      cy.get('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot > #input-330').type('34')
      cy.wait(10000)
      cy.get('.v-expansion-panel-content__wrap > .row > .d-flex > .v-input > .v-input__control > .v-input__slot > .v-select__slot > .v-input__append-inner > .v-input__icon').click()
  
      cy.get('body > #app > .v-menu__content > #list-333 > #list-item-343-2').click()
    
      cy.get('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot > #input-338').click()
    
      cy.get('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot > #input-338').type('fg')
    
      cy.get('.container:nth-child(1) > .row:nth-child(3) > .col:nth-child(3) > .primary > .v-btn__content > .mt-3').click()
      cy.wait(7000)
      cy.get('.v-stepper__items > .v-stepper__content > .v-stepper__wrapper > .container > h3').should(($r)=>{
        expect($r).to.contain('Confirm order')
      })
        cy.get('.container:nth-child(2) > .row > .col:nth-child(3) > .primary > .v-btn__content > .mt-3').click()
        cy.wait(12000)
        cy.get('#Sidebar > .no-radius > .v-navigation-drawer__content > .v-list > .sidebar-item:nth-child(6)').click()
    })

    it('PRUEBA 28 -  Información válida al realizar el envío', function() {
  
      cy.viewport(1920, 937)
    
      cy.visit('http://staging-shipthis.herokuapp.com/')
    
      cy.get('#Banner > .col > .row > .col > .font-weight-medium:nth-child(1)').click()
    
      cy.get('#sections-list > .v-list-item > div > div > .sections-list__item').click()
    
      cy.get('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot > #input-89').click()
    
      cy.get('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot > #input-89').type('dg@gmail.com')
    
      cy.get('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot > #Password').click()
    
      cy.get('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot > #Password').type('123456')
    
      cy.get('.ma-0 > .v-card__text > .v-form > .v-btn > .v-btn__content').click()

      cy.wait(10000)

      cy.get('.row > .dashboard-list > .ma-2:nth-child(3) > .pa-4 > .dashboard-card__image').click()
      cy.get('.row:nth-child(2) > .col > .primary > .v-btn__content > .v-icon').click()
      cy.get('.v-form > .v-snack:nth-child(5) > .v-snack__wrapper > .v-snack__action > .v-btn > .v-btn__content > .v-icon').click()
      cy.wait(3000)
      cy.get('.v-input--has-state > .v-input__control > .v-input__slot > .v-select__slot > .v-select__selections').click()
      
      cy.get('#app > .v-menu__content > #list-159 > #list-item-243-0 > .v-list-item__content').click()
    
      cy.get('.row > .col-md-12 > .row > .v-btn > .v-btn__content').click()
    
      cy.get('.v-card__text > .v-list:nth-child(5) > .v-list-item > .v-list-item__title > h4').click()
    
      cy.get('.v-input__slot > .v-input--radio-group__input > .v-radio:nth-child(1) > .v-input--selection-controls__input > .v-input--selection-controls__ripple').click()
    
      cy.get('.container:nth-child(1) > div > .row > .v-btn > .v-btn__content').click()
    
      cy.get('.v-dialog__content:nth-child(6) > .v-dialog > .v-card > .v-card__text > .v-list:nth-child(8) > .v-list-item > .v-list-item__title > h4').click()
    
      cy.get('.container > div > .row > .ma-2 > .v-btn__content').click()
    
      cy.get('.row > .col-sm-12 > div > .container > .mb-0').click()
    
      cy.get('.row:nth-child(2) > .col > .primary > .v-btn__content > .mt-3').click()
      cy.get('.v-stepper__items > .v-stepper__content > .v-stepper__wrapper > .container > h4').should(($r)=>{
        expect($r).to.contain('Configure packages')
      })
      cy.get('.v-stepper__content > .v-stepper__wrapper > .container > .container > .mb-2').click()
    
      cy.get('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot > #input-321').click()
    
      cy.get('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot > #input-321').type('34')
    
      cy.get('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot > #input-324').click()
    
      cy.get('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot > #input-324').type('34')
    
      cy.get('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot > #input-327').click()
    
      cy.get('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot > #input-327').type('34')
    
      cy.get('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot > #input-330').click()
    
      cy.get('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot > #input-330').type('34')
      cy.wait(10000)
      cy.get('.v-expansion-panel-content__wrap > .row > .d-flex > .v-input > .v-input__control > .v-input__slot > .v-select__slot > .v-input__append-inner > .v-input__icon').click()
  
      cy.get('body > #app > .v-menu__content > #list-333 > #list-item-343-2').click()
    
      cy.get('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot > #input-338').click()
    
      cy.get('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot > #input-338').type('fg')
    
      cy.get('.container:nth-child(1) > .row:nth-child(3) > .col:nth-child(3) > .primary > .v-btn__content > .mt-3').click()
      cy.wait(7000)
      cy.get('.v-stepper__items > .v-stepper__content > .v-stepper__wrapper > .container > h3').should(($r)=>{
        expect($r).to.contain('Confirm order')
      })
        cy.get('.container:nth-child(2) > .row > .col:nth-child(3) > .primary > .v-btn__content > .mt-3').click()
        cy.wait(12000)
        cy.get('.home > #TrackingPage > .row > .text-center > .white--text').should('be.visible')
        cy.get('#Sidebar > .no-radius > .v-navigation-drawer__content > .v-list > .sidebar-item:nth-child(6)').click()
    })
  })

  describe('Selección de dirección de destino', function() {
     it('PRUEBA 29 - Dirección de destino válida', function() {
   
       cy.viewport(1920, 937)
     
       cy.visit('http://staging-shipthis.herokuapp.com/')
     
       cy.get('#Banner > .col > .row > .col > .font-weight-medium:nth-child(1)').click()
     
       cy.get('#sections-list > .v-list-item > div > div > .sections-list__item').click()
     
       cy.get('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot > #input-89').click()
     
       cy.get('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot > #input-89').type('dg@gmail.com')
     
       cy.get('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot > #Password').click()
     
       cy.get('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot > #Password').type('123456')
     
       cy.get('.ma-0 > .v-card__text > .v-form > .v-btn > .v-btn__content').click()
 
       cy.wait(10000)
 
       cy.get('.row > .dashboard-list > .ma-2:nth-child(3) > .pa-4 > .dashboard-card__image').click()
       cy.wait(3000)
        
        cy.get('.v-input__slot > .v-input--radio-group__input > .v-radio:nth-child(2) > .v-input--selection-controls__input > .v-input--selection-controls__ripple').click()
    
        cy.contains('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot', 'City').find('input').click()
    
        cy.contains('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot', 'City').find('input').type('San Francisco')
    
        cy.contains('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot', 'State').find('input').click()
    
        cy.contains('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot', 'State').find('input').type('CA')
    
        cy.contains('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot', 'Address').find('input').click()
    
        cy.contains('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot', 'Address').find('input').type('185 BERRY ST STE 6100')
    
        cy.contains('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot', 'Zip Code').find('input').click()
    
        cy.contains('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot', 'Zip Code').find('input').type('94107')
    
        cy.get('.v-input > .v-input__control > .v-input__slot > .v-select__slot > .v-select__selections').last().click()
    
        cy.get('.v-menu__content > .v-list > .v-list-item > .v-list-item__content > .v-list-item__title').first().click()
    
        cy.get('.container > div > .row > .ma-2 > .v-btn__content').click()
    
        cy.get('.row > .col-sm-12 > div > .container > .mb-0').click()
    
        cy.get('.row > .col-md-12 > .row > .v-btn > .v-btn__content').click()
    
        cy.get('.v-card__text > .v-list:nth-child(4) > .v-list-item > .v-list-item__title > h4').click()
    
        cy.get('.row:nth-child(2) > .col > .primary > .v-btn__content > .mt-3').click()
    
        cy.get('.v-stepper__items > .v-stepper__content > .v-stepper__wrapper > .container > h4').should(($r)=>{
          expect($r).to.contain('Configure packages')
        })
        
       
         cy.wait(12000)
         cy.get('#Sidebar > .no-radius > .v-navigation-drawer__content > .v-list > .sidebar-item:nth-child(6)').click()
     })
     it('PRUEBA 30 - Dirección de destino no válida', function() {
   
      cy.viewport(1920, 937)
    
      cy.visit('http://staging-shipthis.herokuapp.com/')
    
      cy.get('#Banner > .col > .row > .col > .font-weight-medium:nth-child(1)').click()
    
      cy.get('#sections-list > .v-list-item > div > div > .sections-list__item').click()
    
      cy.get('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot > #input-89').click()
    
      cy.get('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot > #input-89').type('dg@gmail.com')
    
      cy.get('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot > #Password').click()
    
      cy.get('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot > #Password').type('123456')
    
      cy.get('.ma-0 > .v-card__text > .v-form > .v-btn > .v-btn__content').click()

      cy.wait(10000)

      cy.get('.row > .dashboard-list > .ma-2:nth-child(3) > .pa-4 > .dashboard-card__image').click()
      cy.wait(3000)
       
       cy.get('.v-input__slot > .v-input--radio-group__input > .v-radio:nth-child(2) > .v-input--selection-controls__input > .v-input--selection-controls__ripple').click()
   
       cy.contains('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot', 'City').find('input').click()
   
       cy.contains('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot', 'City').find('input').type('1')
   
       cy.contains('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot', 'State').find('input').click()
   
       cy.contains('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot', 'State').find('input').type('2')
   
       cy.contains('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot', 'Address').find('input').click()
   
       cy.contains('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot', 'Address').find('input').type('3')
   
       cy.contains('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot', 'Zip Code').find('input').click()
   
       cy.contains('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot', 'Zip Code').find('input').type('4')
   
       cy.get('.v-input > .v-input__control > .v-input__slot > .v-select__slot > .v-select__selections').last().click()
   
       cy.get('.v-menu__content > .v-list > .v-list-item > .v-list-item__content > .v-list-item__title').first().click()
   
       cy.get('.container > div > .row > .ma-2 > .v-btn__content').click()
   
       cy.get('.row > .col-sm-12 > div > .container > .mb-0').click()
   
       cy.get('.row > .col-md-12 > .row > .v-btn > .v-btn__content').click()
   
       cy.get('.v-card__text > .v-list:nth-child(4) > .v-list-item > .v-list-item__title > h4').click()
       
       cy.get('.row:nth-child(2) > .col > .primary > .v-btn__content > .mt-3').click()

       cy.wait(7000)
 
      cy.get('.v-form > .v-snack:nth-child(4) > .v-snack__wrapper > .v-snack__action > .v-btn > .v-btn__content > .v-icon').click()
      cy.get('.v-form > .v-snack:nth-child(4) > .v-snack__wrapper > .v-snack__action > .v-btn > .v-btn__content > .v-icon').should('be.visible')
        cy.wait(3000)
        cy.get('#Sidebar > .no-radius > .v-navigation-drawer__content > .v-list > .sidebar-item:nth-child(6)').click()
    })
    })

    describe('Selección de receptor', function() {
      it('PRUEBA 31 - Receptores registrados', function() {
    
        cy.viewport(1920, 937)
      
        cy.visit('http://staging-shipthis.herokuapp.com/')
      
        cy.get('#Banner > .col > .row > .col > .font-weight-medium:nth-child(1)').click()
      
        cy.get('#sections-list > .v-list-item > div > div > .sections-list__item').click()
      
        cy.get('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot > #input-89').click()
      
        cy.get('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot > #input-89').type('dg@gmail.com')
      
        cy.get('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot > #Password').click()
      
        cy.get('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot > #Password').type('123456')
      
        cy.get('.ma-0 > .v-card__text > .v-form > .v-btn > .v-btn__content').click()
  
        cy.wait(10000)
  
        cy.get('.row > .dashboard-list > .ma-2:nth-child(3) > .pa-4 > .dashboard-card__image').click()
        cy.wait(3000)
         
         cy.get('.container > div > .row > .ma-2 > .v-btn__content').click()
     
         cy.get('.row > .col-sm-12 > div > .container > .mb-0').click()
     
         cy.get('.v-form > .container > div > .order-details > .font-weight-bold').should('be.visible')
         cy.get('.row:nth-child(2) > .col > .primary > .v-btn__content > .mt-3').click()
        
          cy.wait(12000)
          cy.get('#Sidebar > .no-radius > .v-navigation-drawer__content > .v-list > .sidebar-item:nth-child(6)').click()
      })
     
     })

     describe('Registro de receptores', function() {
      it('PRUEBA 32 - Información inválida', function() {
    
        cy.viewport(1920, 937)
      
        cy.visit('http://staging-shipthis.herokuapp.com/')
      
        cy.get('#Banner > .col > .row > .col > .font-weight-medium:nth-child(1)').click()
      
        cy.get('#sections-list > .v-list-item > div > div > .sections-list__item').click()
      
        cy.get('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot > #input-89').click()
      
        cy.get('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot > #input-89').type('dg@gmail.com')
      
        cy.get('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot > #Password').click()
      
        cy.get('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot > #Password').type('123456')
      
        cy.get('.ma-0 > .v-card__text > .v-form > .v-btn > .v-btn__content').click()
  
        cy.wait(10000)
  
        cy.get('.row > .dashboard-list > .ma-2:nth-child(3) > .pa-4 > .dashboard-card__image').click()
        cy.wait(3000)
         
        cy.get('.container > div > .row:nth-child(2) > .v-btn > .v-btn__content').click()

        cy.contains('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot', 'First name').find('input').click()

        cy.contains('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot', 'First name').find('input').type('Carlos')
 
     
        cy.contains('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot', 'Last Name').find('input').click()

        cy.contains('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot', 'Last Name').find('input').type('Gúzman')

  
        cy.contains('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot', 'Email').find('input').click({force: true})

        cy.contains('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot', 'Email').find('input').type('cg@gmail.com', {force: true} )


        cy.contains('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot', 'Phone number').find('input').click()

        cy.contains('.v-input > .v-input__control > .v-input__slot > .v-text-field__slot', 'Phone number').find('input').type('+1 (111) 111-1111')

     
        cy.get('.v-dialog > .v-card > .v-card__actions > .v-btn:nth-child(3) > .v-btn__content').click()
     
        
        cy.get('span > .v-snack > .v-snack__wrapper > .v-snack__action > .v-btn > .v-btn__content > .v-icon').should('not.be.visible')
        cy.get('.v-dialog > .v-card > .v-card__actions > .v-btn:nth-child(2) > .v-btn__content').click()
         
        
          cy.wait(3000)
          cy.get('#Sidebar > .no-radius > .v-navigation-drawer__content > .v-list > .sidebar-item:nth-child(6)').click()
      })
     
     })
 })
 