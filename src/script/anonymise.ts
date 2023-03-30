import prompts from 'prompts';
import assignments from '../assignments.json';
import getConsentingStudents from '../getConsentingStudents';
import getSavedFile from '../getSavedFile';

export default async function runAnonymise() {
  // Which task do you want to grade?
  const task = await prompts({
    type: 'select',
    name: 'value',
    message: 'Which task do you want to grade data for?',
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
    message: 'Which exercise do you want to grade?',
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

  // Get relevant files for exercise
  const assignmentFiles =
    assignments[task.value][exercise.value].assignmentFiles;

  // Get students for task
  const students = getConsentingStudents({ years: [22] });

  // Go through all students, and all their files and anonymise them
  students.forEach((student) => {
    assignmentFiles.forEach((file) => {
      // Read file
      getSavedFile({
        filePath: file,
        studentId: student.id,
        task,
        originality: 'original',
      });

      // Anonymise file
      // Find any things in the text that should be anonymised, and replace them with anonymised versions
    });
  });
}
