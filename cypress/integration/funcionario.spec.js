/// <reference types="cypress" />

var faker = require('faker-br');

describe('Funcionalidade Funcionario', () => {

    const perfil = require('../fixtures/perfil.json')

    beforeEach(() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/index.php/pim/viewEmployeeList/reset/1')
        cy.get('#divUsername > .form-hint').should('be.visible').type(perfil.usuario)
        cy.get('#txtPassword').should('be.visible').type(perfil.senha)
        cy.get('#btnLogin').click()

        
    });


    it('Deve adicionar funcionário com sucesso', () => {

        let nome = faker.name.firstName()
        let sobrenome = faker.name.lastName()

        cy.get('#menu_pim_viewPimModule > b').trigger('mouseover')

        cy.visit('https://opensource-demo.orangehrmlive.com/index.php/pim/addEmployee')
        cy.get('h1').should('contain','Add Employee')

        cy.get('#firstName').type(nome)
        cy.get('#lastName').type(sobrenome)
        cy.get('#btnSave').click()

        //verificação
        cy.get('#pdMainContainer > .head > h1').should('contain','Personal Details')
        
        
    });

    it('Deve localizar funcionário com sucesso', () => {

        let nome = faker.name.firstName()
        let sobrenome = faker.name.lastName()
        let identidade = faker.random.number()

        cy.get('#menu_pim_viewPimModule > b').trigger('mouseover')

        cy.visit('https://opensource-demo.orangehrmlive.com/index.php/pim/addEmployee')

        cy.get('#firstName').type(nome)
        cy.get('#lastName').type(sobrenome)
        cy.get('#employeeId').clear().type(identidade)

        cy.get('#btnSave').click()


        cy.visit('https://opensource-demo.orangehrmlive.com/index.php/pim/viewEmployeeList/reset/1')
        cy.get('#empsearch_id').type(identidade)
        cy.get('#searchBtn').click()

        //verificação
        cy.get('.odd > :nth-child(2) > a').should('contain',identidade)


    });

    it('Deve excluir funcionário com sucesso', () => {

        let nome = faker.name.firstName()
        let sobrenome = faker.name.lastName()
        let identidade = faker.random.number()

        cy.get('#menu_pim_viewPimModule > b').trigger('mouseover')

        cy.visit('https://opensource-demo.orangehrmlive.com/index.php/pim/addEmployee')

        cy.get('#firstName').type(nome)
        cy.get('#lastName').type(sobrenome)
        cy.get('#employeeId').clear().type(identidade)

        cy.get('#btnSave').click()


        cy.visit('https://opensource-demo.orangehrmlive.com/index.php/pim/viewEmployeeList/reset/1')
        cy.get('#empsearch_id').type(identidade)
        cy.get('#searchBtn').click()

        cy.get('#ohrmList_chkSelectAll').check().should("be.checked")

        cy.get('#btnDelete').click()
        cy.get('#dialogDeleteBtn').click()
        
        //verificação
        cy.get('.message').should('contain','Successfully Deleted')


        
    });

    it('Deve exibir mensagem de erro para funcionário não encontrado', () => {
        
        cy.visit('https://opensource-demo.orangehrmlive.com/index.php/pim/addEmployee')
        cy.visit('https://opensource-demo.orangehrmlive.com/index.php/pim/viewEmployeeList/reset/1')
        cy.get('#empsearch_id').type('000')
        cy.get('#searchBtn').click()

        //verificação
        cy.get('td').should('contain','No Records Found')


        
    });
});