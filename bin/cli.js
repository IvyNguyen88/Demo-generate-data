import { generateFakeUsers } from '../generators/dataGenerator.js';
import {
  generateFeaturesFromUsers,
  generateFeaturesFromPromptFile,
  generateFeatureFromPrompt
} from '../generators/bddGenerator.js';

// Tạo user giả lập
const users = generateFakeUsers(3);
generateFeaturesFromUsers(users, '@smoke @login');

// Tạo từ file prompt.txt
generateFeaturesFromPromptFile('prompts.txt');

// Tạo từ 1 dòng cụ thể
generateFeatureFromPrompt('User login with invalid format email', '@ai', 'outline');

console.log('✅ Done generating BDD .feature files.');
