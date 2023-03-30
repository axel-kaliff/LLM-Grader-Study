import prompts from 'prompts';
import downloadFileForAllStudents from './downloadFileForAllStudents';
import getConsentingStudents from './getConsentingStudents';
import getFileContent from './getFileContent';
import assignments from './assignments.json';

async function start() {
  const whatToDo = await prompts({
    type: 'select',
    name: 'value',
    message: 'What do you want to do?',
    choices: [{ title: 'Download student data', value: 'download' }],
  });

  if (whatToDo.value === 'download') {
    // Prompt for year
    const year = await prompts({
      type: 'select',
      name: 'value',
      message: 'Which year do you want to download data for?',
      choices: [{ title: '2022', value: 22 }],
    });

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

    // Get assignmentFiles for task
    // Assignments JSON are in form of { task: [{ assignmentFiles}]}
    const assignmentFiles = assignments[task.value].map(
      (assignment) => assignment.assignmentFiles
    );
    // flatten array and remove duplicates
    const filePaths = assignmentFiles
      .flat()
      .filter((filePath, index, self) => self.indexOf(filePath) === index);
    filePaths.forEach((path) => {
      const studentIds = getConsentingStudents({ years: [year.value] });
      downloadFileForAllStudents({
        filePath: path,
        students: studentIds.map((id) => ({
          id,
          year: year.value,
        })),
        task: task.value,
      });
    });
  }
}

export default start;
