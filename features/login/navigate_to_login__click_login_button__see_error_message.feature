@unspecified
Feature: navigate to login -> click login button -> see error message

  Scenario: navigate to login -> click login button -> see error message
    Given navigate to login
    When click login button
    Then see error message