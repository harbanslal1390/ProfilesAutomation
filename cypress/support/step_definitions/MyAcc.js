/// <reference types="cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
const namespace = "4k2zi"; // Replace with your desired namespace (email prefix)
const apiKey = "fe073a2e-8960-4940-a4b5-42c1df6812f6"; // Replace with your TestMail API key
const tag = "your-tag44"; // Replace with your tag (optional, depending on your TestMail setup)

// Create a function to retrieve OTP from the TestMail API

Given("I am on the login page", () => {
  const { setValue } = require('../sharedData');
  cy.visit("https://stg-account.flightcentre.com.au/");

  cy.get("#email").type(`${namespace}.${tag}@inbox.testmail.app`);
  const myValue = `${namespace}.${tag}@inbox.testmail.app`;
    setValue('ShareEmail', myValue);
  cy.log();
  cy.get('button[data-testid="PrimaryButton"]').click();

  getOTPFromEmail();

  // Step 3: Use the OTP in your form
  cy.get("@otp").then((otp) => {
    cy.log(otp);
    console.log(otp);
    cy.get('input[aria-label*="Digit 1"]').should("be.visible");
    cy.get('input[aria-label*="Digit 1"]').type(otp);
  });
});
When("I enter the customer first name and last name", () => {
  cy.wait(10000);
  cy.get("#mui-1").type("TestDummyFirstName");
  cy.get("#mui-2").type("TestLastName");

  cy.get('Button[type="submit"]').click();
});

Then("I enter required data in the Personal info page",()=>{
  cy.wait(5000)
  cy.get("button[aria-label='Add Preferred name']").click()
  cy.get("#mui-1").type("FakePrefferedName")
  cy.get('button[data-testid="PrimaryButton"]').click();
  cy.wait(5000)
  cy.get("button[aria-label='Add Date of birth']").click()
  cy.get("#mui-2").type("12/12/2010")
  cy.get('button[data-testid="PrimaryButton"]').click();
  cy.wait(5000)
  cy.get("button[aria-label='Add Phone number']").click()
  cy.get("#mui-5").type("456543234")
  cy.get('button[data-testid="PrimaryButton"]').click();
  cy.wait(5000)
  cy.get("button[aria-label='Add Passport details']").click()
  cy.get("input[name='country']").click()
  cy.wait(2000)
  cy.get("li.MuiAutocomplete-option").contains("Algeria").click()
  cy.get("#mui-8").type("1234567890")
  cy.get("#mui-10").type("12/12/2030")
  cy.get('button[data-testid="PrimaryButton"]').click();
  cy.wait(5000)
  cy.get("button[aria-label='Add Frequent flyer details']").click()
  cy.get("#mui-12").click()
  cy.get("li.MuiAutocomplete-option").contains("AccesRail").click()
  cy.get('input[placeholder="Frequent Flyer Number"]').type("123456789")
  cy.wait(5000)
  cy.get('button[Type="submit"]').click();
  // cy.get("#mui-5").type("456543234") 
  // cy.get('button[data-testid="PrimaryButton"]').click(); ok
  
  
});
const getOTPFromEmail = () => {
  const currentDate = Date.now();
  cy.wrap(currentDate).as("currentDate");
  cy.wrap(tag).as("tag");

  return cy.get("@currentDate").then((currentDate) => {
    return cy.get("@tag").then((tag) => {
      // Request the latest email using TestMail API
      cy.request(
        "GET",
        `https://api.testmail.app/api/json?namespace=${namespace}&apikey=${apiKey}&tag=${tag}&pretty=true&limit=1&livequery=true&timestamp_from=${currentDate}`
      ).then((res) => {
        // Retrieve the OTP from the email body
        console.log("=======================================" + res.body);
        const otpEmail = res.body.emails[0];
        const otp = otpEmail.subject.substr(0, 4); // Assuming OTP is in the email subject
        cy.wrap(otp).as("otp"); // Save OTP as a Cypress alias for later use
      });
    });
  });
};
