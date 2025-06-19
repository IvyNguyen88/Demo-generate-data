@unspecified
Feature: Navigate to login page -> Enter email -> Enter password -> Click login -> See error message

  Scenario: Navigate to login page -> Enter email -> Enter password -> Click login -> See error message
    Given Navigate to login page
    And Enter email
    And Enter password
    When Click login
    Then See error message