const fs = require('fs');
const prompts = require('prompts');
const assignments = require('./assignments.json');
const gradeAssignments = require('./gradeAssignments.js');

// Function to get a list of exercises for a given task
function getExercisesForTask(taskNumber) {
  return assignments[taskNumber].map((assignment) => assignment.assignmentName);
}

// Function to get a list of students for a given task
function getStudentsForTask(taskNumber) {
  const path = `./../tests/task-${taskNumber}/submissions/original/`;
  const dirs = fs.readdirSync(path, { withFileTypes: true });
  return dirs.filter((dir) => dir.isDirectory()).map((dir) => dir.name);
}

function runGradeAssignments(taskNumber, exerciseName, studentId, promptLevel) {
  // Get exercise index for the given exercise name
  const exerciseIndex = assignments[taskNumber].findIndex((assignment) => assignment.assignmentName === exerciseName);

  // Get the assignment file
  const assignmentFile = assignments[taskNumber][exerciseIndex].assignmentFiles[0];

  // Remove .md from promptLevel
  promptLevel = promptLevel.replace('.md', '');

  gradeAssignments(taskNumber, assignmentFile, exerciseIndex, promptLevel, studentId);
}

// Main function to prompt the user and run the grading script
async function run() {
  const taskNumberChoices = [Object.keys(assignments)].flat();
  const taskNumber = await prompts({
    type: 'select',
    name: 'value',
    message: 'Which task do you want to do?',
    choices: taskNumberChoices.map((choice) => ({ title: choice, value: choice })),
  });

  const exerciseNameChoices = [getExercisesForTask(taskNumber.value)].flat();
  const exerciseName = await prompts({
    type: 'select',
    name: 'value',
    message: 'Which exercise?',
    choices: exerciseNameChoices.map((choice) => ({ title: choice, value: choice })),
  });

  const studentIdChoices = ['all', getStudentsForTask(taskNumber.value)].flat();
  const studentId = await prompts({
    type: 'select',
    name: 'value',
    message: 'Which student?',
    choices: studentIdChoices.map((choice) => ({ title: choice, value: choice })),
  });

  // if(exerciseName.value === 'all') {
  //   exerciseName.value = getExercisesForTask(taskNumber.value);
  // }

  if(studentId.value === 'all') {
    studentId.value = getStudentsForTask(taskNumber.value);
  }

  // Get exercise index for the given exercise name
  const exerciseIndex = assignments[taskNumber.value].findIndex((assignment) => assignment.assignmentName === exerciseName.value);

  // Find context levels for the given exercise by checking what files exist in the folder
  // If no context, exit
  try {
    fs.accessSync(`./../tests/task-${taskNumber.value}/prompts/${exerciseIndex}/`, fs.constants.R_OK);
  }
  catch (err) {
    console.log('No context levels found for this exercise. Exiting...');
    return;
  }

  const contextLevels = fs.readdirSync(`./../tests/task-${taskNumber.value}/prompts/${exerciseIndex}/`);

  // Choose context level
  const contextLevel = await prompts({
    type: 'select',
    name: 'value',
    message: 'Which context level?',
    choices: contextLevels.map((choice) => ({ title: choice, value: choice })),
  });

  // If all questions have been answered, run the grading script
  if(
    taskNumber.value &&
    exerciseName.value &&
    studentId.value &&
    contextLevel.value
  ) {
    runGradeAssignments(taskNumber.value, exerciseName.value, studentId.value, contextLevel.value);
  }
}

run();

