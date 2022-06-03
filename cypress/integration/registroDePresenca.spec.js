/// <reference types="cypress" />

var faker = require('faker-br');

describe('Funcionalidade Presenca', () => {

    const perfil = require('../fixtures/perfil.json')

    beforeEach(() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/index.php/pim/viewEmployeeList/reset/1')
        cy.get('#divUsername > .form-hint').should('be.visible').type(perfil.usuario)
        cy.get('#txtPassword').should('be.visible').type(perfil.senha)
        cy.get('#btnLogin').click()
        
    });

    it('Deve apresentar funcionários e seu registro de presença com sucesso', () => {
        
        let nome = faker.name.firstName()
        let sobrenome = faker.name.lastName()
        let nomeCompleto = nome.concat(" ").concat(sobrenome)
        
        
        cy.get('#menu_pim_viewPimModule > b').trigger('mouseover')

        cy.visit('https://opensource-demo.orangehrmlive.com/index.php/pim/addEmployee')
        cy.get('h1').should('contain','Add Employee')

        cy.get('#firstName').type(nome)
        cy.get('#lastName').type(sobrenome)
        cy.get('#btnSave').click()

        
        cy.visit('https://opensource-demo.orangehrmlive.com/index.php/time/viewTimeModule')
        cy.visit('https://opensource-demo.orangehrmlive.com/index.php/attendance/viewAttendanceRecord#')
        cy.visit('https://opensource-demo.orangehrmlive.com/index.php/attendance/viewAttendanceRecord')

        cy.get('#attendance_employeeName_empName').type(nomeCompleto)
        cy.get('#attendance_date').type('2022-07-27')
        cy.get('#btView').click()


        //verificacao
        cy.get('.odd > :nth-child(1)').should('contain',nomeCompleto)
        
    });

    it('Deve apresentar mensagem de erro ao inserir usuário inexistente', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/index.php/time/viewTimeModule')
        cy.visit('https://opensource-demo.orangehrmlive.com/index.php/attendance/viewAttendanceRecord#')
        cy.visit('https://opensource-demo.orangehrmlive.com/index.php/attendance/viewAttendanceRecord')

        cy.get('#attendance_employeeName_empName').type('9oiu')
        cy.get('#attendance_date').type('2022-07-27')
        cy.get('#btView').click()

        //verificacao
        cy.get('span.validation-error').should('contain','Invalid Employee Name')

        
    });

    it('Deve apresentar mensagem de erro por falta de preenchimento da data', () => {

        let nome = faker.name.firstName()
        let sobrenome = faker.name.lastName()

        cy.get('#menu_pim_viewPimModule > b').trigger('mouseover')

        cy.visit('https://opensource-demo.orangehrmlive.com/index.php/pim/addEmployee')
        cy.get('h1').should('contain','Add Employee')

        cy.get('#firstName').type(nome)
        cy.get('#lastName').type(sobrenome)
        cy.get('#btnSave').click()
        let nomeCompleto = nome.concat(" ").concat(sobrenome)

        cy.visit('https://opensource-demo.orangehrmlive.com/index.php/time/viewTimeModule')
        cy.visit('https://opensource-demo.orangehrmlive.com/index.php/attendance/viewAttendanceRecord#')
        cy.visit('https://opensource-demo.orangehrmlive.com/index.php/attendance/viewAttendanceRecord')

        cy.get('#attendance_employeeName_empName').type(nomeCompleto)
        cy.get('#btView').click()

        //verificacao
        cy.get('span.validation-error').should('contain','Should be a valid date in yyyy-mm-dd format')

    
        
    });
    
});

