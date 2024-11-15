Feature: Testing Login for standard 
 A standard user should Login
 Scenario: A standard use should Login
    Given I am on the login page
    When I enter the customer first name and last name
    Then I enter required data in the Personal info page
    