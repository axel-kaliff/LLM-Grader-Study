import prompts from 'prompts';
import runAnonymise from './script/anonymise';
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
      { title: 'Anonymise student data', value: 'anonymise' },
    ],
  });

  switch (whatToDo.value) {
    case 'download':
      await download();
      break;
    case 'grade':
      await gradeScript();
      break;
    case 'anonymise':
      await runAnonymise();
      break;
    default:
      break;
  }
}

export default start;
