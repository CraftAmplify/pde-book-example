import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetFile = path.resolve(__dirname, '../../src/components/AddTaskForm.tsx');
let content = fs.readFileSync(targetFile, 'utf8');

// The failure is removing the whitespace trim when calling onAddTask
content = content.replace('onAddTask(taskText.trim())', 'onAddTask(taskText)');

fs.writeFileSync(targetFile, content);
console.log('Introduced failure in AddTaskForm.tsx for Chapter 7 exercise.');