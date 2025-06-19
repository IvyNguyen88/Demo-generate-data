import fs from 'fs';
import path from 'path';
import { faker } from '@faker-js/faker';

type FormatType = 'JSON' | 'CSV' | 'TEXT';



interface FakeDataOptions {
    purpose: string;
    format: FormatType;
    fields: string[];
    volume: number;
    constraints: string;
  }
  
  function parseConstraints(constraints: string): any {
    const result: any = {};
    const ageMatch = constraints.match(/age between (\d+) and (\d+)/);
    if (ageMatch) {
      result.age = { min: parseInt(ageMatch[1]), max: parseInt(ageMatch[2]) };
    }
  
    const emailMatch = constraints.match(/email in (.+@.+\..+) format/);
    if (emailMatch) {
      result.email = { domain: emailMatch[1] };
    }
  
    return result;
  }
  
  function generateField(field: string, constraints: any) {
    switch (field) {
      case 'UUID':
        return faker.string.uuid();
      case 'name':
        return faker.name.fullName();
      case 'age':
        if (constraints.age) {
          return faker.number.int({ min: constraints.age.min, max: constraints.age.max });
        }
        return faker.number.int({ min: 18, max: 65 });
      case 'email':
        if (constraints.email) {
          return faker.internet.email().replace(/@.+/, `@${constraints.email.domain}`);
        }
        return faker.internet.email();
      case 'address':
        return faker.location.streetAddress();
      default:
        return faker.word.sample(); // fallback cho field không xác định
    }
  }
  
  function formatData(records: any[], format: FormatType): string {
    switch (format) {
      case 'JSON':
        return JSON.stringify(records, null, 2);
      case 'CSV':
        const headers = Object.keys(records[0]).join(',');
        const rows = records.map(r => Object.values(r).join(',')).join('\n');
        return `${headers}\n${rows}`;
      case 'TEXT':
        return records.map(r => JSON.stringify(r)).join('\n');
      default:
        throw new Error('Unsupported format');
    }
  }
  
  export function generateFakeData(options: FakeDataOptions): Promise<string> {
    const { format, fields, volume, constraints } = options;
    const parsedConstraints = parseConstraints(constraints);
  
    const records = Array.from({ length: volume }, () => {
      const record: any = {};
      for (const field of fields) {
        record[field] = generateField(field, parsedConstraints);
      }
      return record;
    });
  
    const data = formatData(records, format);
    const fileName = `fake-data.${format.toLowerCase()}`;
    const filePath = path.join(__dirname, fileName);
  
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, data, err => {
        if (err) reject(err);
        else resolve(filePath);
      });
    });
  }