import prompts from 'prompts';
import getConsentingStudents from '../getConsentingStudents';
import assignments from '../assignments.json';
import { exec } from 'child_process';

export default async function injectErrors() {
  const task = await prompts({
    type: 'select',
    name: 'value',
    message: 'Which task do you want to inject errors in?',
    choices: Object.keys(assignments).map((key) => ({
      title: key,
      value: key,
    })),
  });

  // Catch no answer
  if (!task.value) {
    console.log('No task selected, exiting');
    return;
  }

  // Get relevant exercises for task
  // Assignments JSON are in form of { task: [{ assignmentFiles }]}
  const exerciseNames = assignments[task.value].map(
    ({ assignmentName }) => assignmentName
  );

  // Choose which exercise to gradeScript
  const exercise = await prompts({
    type: 'select',
    name: 'value',
    message: 'Which exercise do you want to inject errors in?',
    choices: exerciseNames.map((name, index) => ({
      title: name,
      value: index,
    })),
  });

  // Catch no answer
  if (exercise.value == null) {
    console.log('No exercise selected, exiting');
    return;
  }

  // What type of error?
  const errorType = await prompts({
    type: 'select',
    name: 'value',
    message: 'What type of error do you want to inject?',
    choices: [
      { title: 'Syntax error', value: 'syntax' },
      { title: 'Runtime error', value: 'runtime' },
    ],
  });

  // Get relevant files for exercise
  const assignmentFiles =
    assignments[task.value][exercise.value].assignmentFiles;

  // Get students for task
  const students = getConsentingStudents({ years: [22] });

  // Choose which student to gradeScript
  const student = await prompts({
    type: 'select',
    name: 'value',
    message: 'Which student do you want to create errors for?',
    choices: [
      { title: 'All students', value: 'all' },
      ...students.map(({ id }) => ({
        title: id,
        value: id,
      })),
    ],
  });

  // Catch no answer
  if (!student.value) {
    console.log('No student selected, exiting');
    return;
  }

  if (student.value === 'all') {
    // Since it relies on calling an async function we want to wait for each call to finish before continuing to next one
    for (const student of students) {
      console.log(`Injecting errors in ${student.id}...`);
      await callPythonToInject({
        studentId: student.id,
        task: task.value,
        assignmentFile: assignmentFiles[0],
        error: errorType.value,
      });
    }
  } else {
    console.log(`Injecting errors in ${student.value}...`);
    callPythonToInject({
      studentId: student.value,
      task: task.value,
      assignmentFile: assignmentFiles[0],
      error: errorType.value,
    });
  }
}

async function callPythonToInject({
  studentId,
  task,
  assignmentFile,
  error,
}: {
  studentId: string;
  task: string;
  assignmentFile: string;
  error: string;
}) {
  return new Promise((resolve, reject) => {
    exec(
      `python3 preprocessing/test.py ${studentId} ${task} ${assignmentFile} ${error}`,
      (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          reject(error);
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          reject(stderr);
          return;
        }
        console.log(`stdout: ${stdout}`);
        resolve(stdout);
      }
    );
  });
}
