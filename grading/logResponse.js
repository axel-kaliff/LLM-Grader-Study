const fs = require('fs');
const getAndParseResponse = require('./getAndParseResponse');

// Arguments of this program is the task number, the prompt level, and the student number
// Example: node logResponse.js 11 Box.java nocontext 1
// Get the arguments from the command line
const args = process.argv.slice(2);

// The feedback is in the file `./../tests/task-${taskNumber}/responses/${studentNumber}`

// Get the task number
const taskNumber = args[0] ?? "11";

// Get the assignment file
const assignmentFile = args[1] ?? "Box.java";

// Get the prompt level
const promptLevel = args[2] ?? "nocontext";

// Get the student number
const studentNumber = args[3] ?? "1";


function logFeedback() {
  // Log getting feedback
  process.stdout.write("Getting feedback... ");
  // Get the response
  const {
    correctness, summarisedFeedback, errors
  } = getAndParseResponse(taskNumber, assignmentFile, promptLevel, studentNumber);
  // Log on same line
  process.stdout.write("\rGetting feedback... Done!\n");

  // Log the correctness
  if (correctness == "Correct") {
    process.stdout.write("\x1b[32m");
  }
  else if (correctness == "Partially correct") {
    process.stdout.write("\x1b[33m");
  }
  else if (correctness == "Incorrect") {
    process.stdout.write("\x1b[31m");
  }
  // Log correctness in different colors
  process.stdout.write(`[Correctness]: ${correctness}\n`);
  // Reset color
  process.stdout.write("\x1b[0m");

  // Log the summarised feedback in gray color
  process.stdout.write("\x1b[90m");
  process.stdout.write(`[Summarized feedback]: ${summarisedFeedback}\n`);
  // Reset color
  process.stdout.write("\x1b[0m");

  // Log the errors in red color
  process.stdout.write("\x1b[31m");
  // If errors are "None", don't log anything
  if (errors != "None.") {
    process.stdout.write(`[Possible errors]: ${errors}\n`);
    // Reset color
    process.stdout.write("\x1b[0m");
  }
}

logFeedback();
