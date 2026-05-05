import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetFile = path.resolve(__dirname, '../../src/components/AddTaskForm.tsx');
let content = fs.readFileSync(targetFile, 'utf8');

// Revert the failure
content = content.replace('onAddTask(taskText)', 'onAddTask(taskText.trim())');

fs.writeFileSync(targetFile, content);
console.log('Reset AddTaskForm.tsx for Chapter 7 exercise.');