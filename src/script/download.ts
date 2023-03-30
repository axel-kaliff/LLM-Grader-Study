import prompts from 'prompts';
import downloadFileForAllStudents from '../downloadFileForAllStudents';
import getConsentingStudents from '../getConsentingStudents';
import assignments from '../assignments.json';

export default async function download() {
  // Prompt for year
  const year = await prompts({
    type: 'select',
    name: 'value',
    message: 'Which year do you want to download data for?',
    choices: [{ title: '2022', value: 22 }],
  });

  // Catch no answer
  if (!year.value) {
    console.log('No year selected, exiting');
    return;
  }

  // Which task do you want to download?
  const task = await prompts({
    type: 'select',
    name: 'value',
    message: 'Which task do you want to download data for?',
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

  // Get assignmentFiles for task
  // Assignments JSON are in form of { task: [{ assignmentFiles }]}
  const assignmentFiles = assignments[task.value].map(
    (assignment) => assignment.assignmentFiles
  );
  // flatten array and remove duplicates
  const filePaths = assignmentFiles
    .flat()
    .filter((filePath, index, self) => self.indexOf(filePath) === index);
  filePaths.forEach((path) => {
    const students = getConsentingStudents({ years: [year.value] });
    downloadFileForAllStudents({
      filePath: path,
      students: students.map(({ id }) => ({
        id,
        year: year.value,
      })),
      task: task.value,
    });
  });
}
