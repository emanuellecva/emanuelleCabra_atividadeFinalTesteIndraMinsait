
/// <reference types="cypress" />

var faker = require('faker-br');

context('Funcionalidade Login', () => {

    

    beforeEach(() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/index.php/pim/viewEmployeeList/reset/1')
    });

    const perfil = require('../fixtures/perfil.json')

    
    it('Deve fazer login com sucesso', () => {
        cy.get('#divUsername > .form-hint').should('be.visible').type(perfil.usuario)
        cy.get('#txtPassword').should('be.visible').type(perfil.senha)
        cy.get('#btnLogin').click()
        
        //verificacao
        cy.get('#welcome').should('contain','Welcome')


        
    });

    it('Deve exibir mensagem de erro ao inserir usuário ou senha inválidos', () => {
        
        let usuario = faker.internet.userName();
        let senha = faker.internet.password();
        
        cy.get('#divUsername > .form-hint').should('be.visible').type(usuario)
        cy.get('#txtPassword').should('be.visible').type(senha)
        cy.get('#btnLogin').click()
        
        //verificacao
        cy.get('#spanMessage').should('contain', 'Invalid credentials')
        
    });
    
    it('Deve exibir mensagem de recuperação de login', () => {


        cy.get('#forgotPasswordLink > a').click()
        cy.get('#securityAuthentication_userName').type('Admin')
        cy.get('#btnSearchValues').click()
        
        //verificacao
        cy.get('.message').should('contain','password')
        
    });




});