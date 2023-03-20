// Import getChatGPTResponse from ../misc/getChatGPTResponse.js
const getChatGPTResponse = require('../misc/getChatGPTResponse.js');
const getSubmission = require('./getSubmission.js');

// Arguments of this program is the task number, the prompt level, and the student number
// Example: node gradeAssignment.js 11 comparable easy 1
// Get the arguments from the command line
const args = process.argv.slice(2);

// Get the task number
const taskNumber = args[0] ?? "11";

// Get the student number
const assignment = args[1] ?? "Box.java";

// Get the prompt level
const promptLevel = args[2] ?? "nocontext";

// Get the student number
const studentNumber = args[3] ?? "1";

// Import fs
const fs = require('fs');

// Read prompt from file baseprompt.txt
const basePrompt = fs.readFileSync('./baseprompt.txt', 'utf8');

// Function to get the grading prompt for the task, stored in `../tests/task-${task}/prompts/${prompt}.txt`
function getPrompt(task, prompt) {
  return fs.readFileSync(`./../tests/task-${task}/prompts/${prompt}.md`, 'utf8');
}

// Do test run of getChatGPTResponse
async function gradeAssignment(taskNumber, assignment, promptLevel, studentNumber, loggingEverything){
  // return console.log(`Task number is ${taskNumber} and student number is ${studentNumber} and prompt level is ${promptLevel} and assignment is ${assignment}`);
  if(loggingEverything == false) process.stdout.write(`Grading student ${studentNumber}...`);
  // Get the prompt

  // Log getting prompt
  if(loggingEverything) process.stdout.write("Getting prompt... ");
  const prompt = getPrompt(taskNumber, promptLevel);
  // Log on same line
  if(loggingEverything) process.stdout.write("\rGetting prompt... Done!\n");

  // Get the submission
  // Log getting submission
  if(loggingEverything) process.stdout.write("Getting submission... ");
  const submission = getSubmission(taskNumber, assignment, studentNumber);
  if(loggingEverything) process.stdout.write("\rGetting submission... Done!\n");

  // Get the response
  // Create a message array with the prompt and submission
  const messages = [
    {
      "role": "system",
      "content": basePrompt
    },
    {
      "role": "user",
      "content": 
      // concatenate the prompt and submission
      prompt + "\n\n\nStudent answer:\n" + submission
    }
  ]

  // Log getting response
  if(loggingEverything) process.stdout.write("Getting response... ");
  // Let getting response be a mock value for now, which takes 5 seconds to get
  let done = false;
  const response =
  // new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve("Correct\n\n\nErrors:\nNone");
  //   }, 5000);
  // })
  getChatGPTResponse(messages)
  .then((response) => {
    console.log(". Done!");
    // Save the response to a file, called `../tests/task-${task}/responses/${student}.txt`
    // Log saving response
    if(loggingEverything) process.stdout.write("Saving response... ");
    // Write the response to the file
    // If the student number folder doesn't exist, create it
    if (!fs.existsSync(`./../tests/task-${taskNumber}/responses/${promptLevel}/${studentNumber}`)) {
      fs.mkdirSync(`./../tests/task-${taskNumber}/responses/${promptLevel}/${studentNumber}`);
    }
    fs.writeFileSync(`./../tests/task-${taskNumber}/responses/${promptLevel}/${studentNumber}/${assignment}`, response);
    if(loggingEverything) process.stdout.write("\rSaving response... Done!\n");
    // else process.stdout.write(`\rGrading student ${studentNumber}... Done!`);
    done = true;
  });
  // For every second waiting, increase a counter and log it
  let counter = 0;
  // While response promise is pending
  while (done == false) {
    await new Promise(r => setTimeout(r, 1000));
    counter++;
    // Don't log the last time because it will be done
if (done == false) process.stdout.write(`\r${!loggingEverything ? `Grading student ${studentNumber}...` : "Getting response..."} waiting for ${counter} seconds`);
  }
}

// In case this file is run directly, run the function
if (require.main === module) {
  gradeAssignment(taskNumber, assignment, promptLevel, studentNumber, true);
}

module.exports = gradeAssignment;
