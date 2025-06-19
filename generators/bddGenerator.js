import fs from 'fs';
import { toFileName, writeFeatureFile, getTagsFromPrompt } from './bddHelper.js';
import { singleScenario, outlineScenario, stepsFromPrompt } from './bddTemplates.js';

function generateFeatureFromPrompt(prompt, tags = '@ai', type = 'single') {
  const parts = prompt.includes(':') ? prompt.split(':') : ['general', prompt];
  const [featureNameRaw, promptRaw] = parts.map(s => s.trim());
  const featureFolder = toFileName(featureNameRaw);
  const promptName = toFileName(promptRaw);
  const template =
    type === 'outline'
      ? outlineScenario(promptRaw, tags)
      : type === 'steps'
      ? `${tags}\nFeature: ${promptRaw}\n\n${stepsFromPrompt(promptRaw)}`
      : singleScenario(promptRaw, tags);

  const fullPath = `${featureFolder}/${promptName}`;
  writeFeatureFile(fullPath, template);
}

function generateFeaturesFromPromptFile(promptFile = 'prompts.txt') {
  if (!fs.existsSync(promptFile)) {
    console.error(`❌ File not found: ${promptFile}`);
    return;
  }

  const prompts = fs.readFileSync(promptFile, 'utf-8').split('\n').filter(Boolean);
  prompts.forEach((prompt) => {
    const tags = getTagsFromPrompt(prompt);
    generateFeatureFromPrompt(prompt, tags, 'steps');
  });
}

function generateFeaturesFromUsers(users, tags = '@smoke') {
  users.forEach((user, index) => {
    const content = `
@user${index + 1} ${tags}
Feature: Login

  Scenario: User tries to login with invalid credentials
    Given the user navigates to the login page
    When the user enters email "${user.email}"
    And the user enters password "wrong-password"
    Then the user should see an error message "Invalid email or password"
    `.trim();

    writeFeatureFile(`login/login_user_${index + 1}`, content);
  });
}

export {
  generateFeatureFromPrompt,
  generateFeaturesFromPromptFile,
  generateFeaturesFromUsers
};
