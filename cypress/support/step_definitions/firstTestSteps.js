import { Given } from "@badeball/cypress-cucumber-preprocessor";
const namespace = "4k2zi"; // Replace with your desired namespace (email prefix)
const apiKey = "fe073a2e-8960-4940-a4b5-42c1df6812f6"; // Replace with your TestMail API key
const tag = "your-tag"; // Replace with your tag (optional, depending on your TestMail setup)

// Create a function to retrieve OTP from the TestMail API

Given("I am on the login page", () => {
  cy.visit("https://stg-account.flightcentre.com.au/");

  cy.get("#email").type(`${namespace}.${tag}@inbox.testmail.app`);
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
