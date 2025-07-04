@user1 @smoke @login
Feature: Login

  Scenario: User tries to login with invalid credentials
    Given the user navigates to the login page
    When the user enters email "Jameson54@yahoo.com"
    And the user enters password "wrong-password"
    Then the user should see an error message "Invalid email or password"