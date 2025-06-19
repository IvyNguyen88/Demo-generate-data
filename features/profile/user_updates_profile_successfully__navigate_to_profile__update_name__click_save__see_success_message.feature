@unspecified
Feature: User updates profile successfully -> Navigate to profile -> Update name -> Click save -> See success message

  Scenario: User updates profile successfully -> Navigate to profile -> Update name -> Click save -> See success message
    Given User updates profile successfully
    Given Navigate to profile
    And Update name
    When Click save
    Then See success message