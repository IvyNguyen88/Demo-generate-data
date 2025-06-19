@ai
Feature: User login with invalid format email

  Scenario Outline: Login test from prompt
    Given the system navigates to login
    When the user uses "<email>" and "<password>"
    Then the result should be "<expected>"

    Examples:
      | email             | password        | expected                  |
      | user@example.com  | wrong-password  | Invalid email or password |
      | admin@example.com | expired-token   | Session expired           |