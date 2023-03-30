import prompts from 'prompts';
import download from './script/download';
import gradeScript from './script/grade';

async function start() {
  const whatToDo = await prompts({
    type: 'select',
    name: 'value',
    message: 'What do you want to do?',
    choices: [
      { title: 'Download student data', value: 'download' },
      { title: 'Grade assignments', value: 'grade' },
    ],
  });

  switch (whatToDo.value) {
    case 'download':
      await download();
      break;
    case 'grade':
      await gradeScript();
      break;
    default:
      break;
  }
}

export default start;
