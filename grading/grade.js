const fs = require('fs');
const prompts = require('prompts');
const assignments = require('./assignments.json');

// Function to get a list of exercises for a given task
function getExercisesForTask(taskNumber) {
  return assignments[taskNumber].map((assignment) => assignment.exercise_name);
}

// Function to get a list of students for a given task
function getStudentsForTask(taskNumber) {
  const path = `./../tests/task-${taskNumber}/submissions/original/`;
  const dirs = fs.readdirSync(path, { withFileTypes: true });
  return dirs.filter((dir) => dir.isDirectory()).map((dir) => dir.name);
}

// Function to grade the assignments for the given task, exercise, and student
function gradeAssignments(taskNumber, exerciseNames, studentIds) {
  // Your grading logic here...
  console.log(taskNumber, exerciseNames, studentIds);
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

  const exerciseNameChoices = ['all', getExercisesForTask(taskNumber.value)].flat();
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

  if(exerciseName.value === 'all') {
    exerciseName.value = getExercisesForTask(taskNumber.value);
  }

  if(studentId.value === 'all') {
    studentId.value = getStudentsForTask(taskNumber.value);
  }

  gradeAssignments(taskNumber.value, exerciseName.value, studentId.value);
}

run();

