const fs = require('fs');

// Arguments of this program is the task number, the prompt level, and the student number
// Example: node logResponse.js 11 nocontext 1
// Get the arguments from the command line
const args = process.argv.slice(2);

// The feedback is in the file `./../tests/task-${taskNumber}/responses/${studentNumber}`

// Get the task number
const taskNumber = args[0] ?? "11";

// Get the prompt level
const promptLevel = args[1] ?? "nocontext";

// Get the student number
const studentNumber = args[2] ?? "1";


function logFeedback() {
  // Log getting feedback
  process.stdout.write("Getting feedback... ");
  // Get the response
  const response = fs.readFileSync(`./../tests/task-${taskNumber}/responses/${promptLevel}/${studentNumber}.txt`, 'utf8');
  // Log on same line
  process.stdout.write("\rGetting feedback... Done!\n");

  /**
   * The response is split into two parts:
   * [Correctness]: Correct / Partially correct / Incorrect
   * [Summarized feedback]: The feedback summarised in one line.
   * [Possible errors]: The errors in the student's submission (in several lines)
   */

  // Log the response in different colors
  // Green for correct, yellow for partially correct and red for incorrect
  // Get the correctness from the first line and don't include "[Correctness]: "
  const correctness = response.split("\n")[0].slice(15);
  // Use regex to get the summarised feedback, and allow for both "Summarized" and "Summarised" to be used
  const summarisedFeedback = response.match(/\[Summari(?:sed|zed) feedback\]: (.*)/)[1];
  // Use regex to get the errors
  const errors = response.match(/\[Possible errors\]: (.*)/)[1];

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
