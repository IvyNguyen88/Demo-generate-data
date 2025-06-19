@user2 @smoke @login
Feature: Login

  Scenario: User tries to login with invalid credentials
    Given the user navigates to the login page
    When the user enters email "Susana_Legros58@hotmail.com"
    And the user enters password "wrong-password"
    Then the user should see an error message "Invalid email or password"