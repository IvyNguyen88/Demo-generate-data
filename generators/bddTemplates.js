export const singleScenario = (prompt, tags) => `
${tags}
Feature: ${prompt}

  Scenario: AI-generated test
    Given the system is ready
    When the prompt is "${prompt}"
    Then the expected behavior should be verified
`;

export const outlineScenario = (prompt, tags) => `
${tags}
Feature: ${prompt}

  Scenario Outline: Login test from prompt
    Given the system navigates to login
    When the user uses "<email>" and "<password>"
    Then the result should be "<expected>"

    Examples:
      | email             | password        | expected                  |
      | user@example.com  | wrong-password  | Invalid email or password |
      | admin@example.com | expired-token   | Session expired           |
`;

export const stepsFromPrompt = (prompt) => {
  const steps = prompt.split('->').map(s => s.trim()).filter(Boolean);
  const lines = steps.map((step, index) => {
    const lower = step.toLowerCase();
    if (index === 0 || lower.startsWith('navigate')) return `    Given ${step}`;
    if (lower.includes('click') || lower.includes('submit')) return `    When ${step}`;
    if (lower.includes('see') || lower.includes('display') || lower.includes('show')) return `    Then ${step}`;
    return `    And ${step}`;
  });
  return `  Scenario: ${prompt}\n${lines.join('\n')}`;
};
