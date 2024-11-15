
/// <reference types="cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
beforeEach(function(){
	cy.fixture("GSCVProfilesTestData").as("TestData")
})
const { getValue } = require('../sharedData');
Given(/^I am on the main page of C1$/, () => {
	const value = getValue('ShareEmail');
	cy.get("@TestData").then((data)=>{
	cy.visit("https://d1mr8fjntorukf.cloudfront.net/")
	
	cy.get("#txtEmail").type(value)
	cy.wait(10000)
	})
});
