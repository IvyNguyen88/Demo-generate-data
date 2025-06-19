import { faker } from '@faker-js/faker';
import fs from 'fs';
import { Parser } from 'json2csv';

export function generateFakeUsers(count = 10) {
  return Array.from({ length: count }).map(() => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    dob: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }).toISOString().split('T')[0],
  }));
}

export function exportAsJSON(data, path = 'data/output.json') {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

export function exportAsCSV(data, path = 'data/output.csv') {
  const parser = new Parser();
  const csv = parser.parse(data);
  fs.writeFileSync(path, csv);
}

export function exportAsText(data, path = 'data/output.txt') {
  const text = data.map(u => `${u.name} | ${u.email} | ${u.dob}`).join('\n');
  fs.writeFileSync(path, text);
}
