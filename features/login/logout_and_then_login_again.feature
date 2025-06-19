@unspecified
Feature: Logout and then login again


  Scenario: Logout and then login again
    Given the system is on the relevant page
    When the user performs: Logout and then login again
    Then the outcome should match expectations