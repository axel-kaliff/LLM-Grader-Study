// const response = fs.readFileSync(`./../tests/task-${taskNumber}/responses/${promptLevel}/${studentNumber}/${assignmentFile}`, 'utf8');
// /**
//    * The response is split into two parts:
//    * [Correctness]: Correct / Partially correct / Incorrect
//    * [Summarized feedback]: The feedback summarised in one line.
//    * [Possible errors]: The errors in the student's submission (in several lines)
//    */

//   // Log the response in different colors
//   // Green for correct, yellow for partially correct and red for incorrect
//   // Get the correctness from the first line and don't include "[Correctness]: "
//   const correctness = response.split("\n")[0].slice(15);
//   // Use regex to get the summarised feedback, and allow for both "Summarized" and "Summarised" to be used
//   const summarisedFeedback = response.match(/\[Summari(?:sed|zed) feedback\]: (.*)/)[1];
//   // Use regex to get the errors
//   const errors = response.match(/\[Possible errors\]: (.*)/)[1];


const fs = require('fs');

// Arguments of this program is the task number, assignmentFile, the prompt level, and the student number
// Example: node getAndParseResponse.js 11 Box.java nocontext 1

// Get the arguments from the command line
const args = process.argv.slice(3);

// Get the task number
const taskNumber = args[0] ?? "11";

// Get the assignment file
const assignmentFile = args[1] ?? "Box.java";

// Get the prompt level
const promptLevel = args[2] ?? "nocontext";

// Get the student number
const studentNumber = args[3] ?? "1";

// The feedback is in the file `./../tests/task-${taskNumber}/responses/${promptLevel}/${studentNumber}/${assignmentFile}`

function getAndParseResponse(taskNumber, assignmentFile, promptLevel, studentNumber) {
  const response = fs.readFileSync(`./../tests/task-${taskNumber}/responses/${promptLevel}/${studentNumber}/${assignmentFile}`, 'utf8');
  /**
   * The response is split into two parts:
   * [Correctness]: Correct / Partially correct / Incorrect
   * [Summarized feedback]: The feedback summarised in one line.
   * [Possible errors]: The errors in the student's submission (in several lines)
   */

  const correctness = response.split("\n")[0].slice(15);
  // Use regex to get the summarised feedback, and allow for both "Summarized" and "Summarised" to be used
  const summarisedFeedback = response.match(/\[Summari(?:sed|zed) feedback\]: (.*)/)[1];
  // Use regex to get the errors
  const errors = response.match(/\[Possible errors\]: (.*)/)[1];

  return {
    correctness,
    summarisedFeedback,
    errors
  }
}

module.exports = getAndParseResponse;

