import {
    generateFakeUsers,
    exportAsJSON,
    exportAsCSV,
    exportAsText
  } from './generators/dataGenerator.js';
  
  import { generateLoginFeature } from './generators/bddGenerator.js';
  
  const users = generateFakeUsers(5);
  exportAsJSON(users);
  exportAsCSV(users);
  exportAsText(users);
  
  // Generate a simple BDD .feature file
  generateLoginFeature(users[0].email, 'wrong-password', 'Invalid credentials');
  console.log('✅ Files generated: JSON, CSV, TXT, and .feature');
  