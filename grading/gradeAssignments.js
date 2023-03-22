const fs = require('fs');
const gradeAssignment = require('./gradeAssignment.js');

// Arguments of this program is the task number, assignment file, and the prompt level
// Example: node gradeAssignmentForAllStudents.js 11 nocontext
// Get the arguments from the command line
const args = process.argv.slice(2);

// Get the task number
const taskNumber = args[0] ?? "11";

// Get the task number
const assignmentFile = args[1] ?? "Box.java";

// Get the prompt level
const promptLevel = args[2] ?? "nocontext";

// Get all different student numbers from the folder
const studentNumbers = fs.readdirSync(`./../tests/task-${taskNumber}/submissions/`);

async function gradeAssignmentForAllStudents(taskNumber, assignmentFile, promptLevel) {
  // Loop through all student numbers
  for (const studentNumber of studentNumbers) {
    // Grade the file
    await gradeAssignment(taskNumber, assignmentFile, promptLevel, studentNumber, false);
  }
}

gradeAssignmentForAllStudents(taskNumber, assignmentFile, promptLevel);
