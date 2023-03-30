import prompts from 'prompts';
import getAndSaveFile from './downloadFile';
import downloadFileForAllStudents from './downloadFileForAllStudents';
import getFileContent from './getFileContent';
import saveFile from './saveFile';

async function start() {
  const whatToDo = await prompts({
    type: 'select',
    name: 'value',
    message: 'What do you want to do?',
    choices: [{ title: 'Download student data', value: 'download' }],
  });

  if (whatToDo.value === 'download') {
    // Do something
    downloadFileForAllStudents({
      students: [
        {
          id: 'douben',
          year: 19,
        },
      ],
      filePath: 'ListProcessor.java',
      task: 10,
    });
  }
}

export default start;
