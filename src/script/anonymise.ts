import prompts from 'prompts';
import assignments from '../assignments.json';
import getConsentingStudents from '../getConsentingStudents';
import getSavedFile from '../getSavedFile';
import saveFile from '../saveFile';

export default async function runAnonymise() {
  // Which task do you want to anonymise?
  const task = await prompts({
    type: 'select',
    name: 'value',
    message: 'Which task do you want to anonymise data for?',
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

  // Get relevant files for exercise
  const assignmentFiles = assignments[task.value]
    .map(({ assignmentFiles }) => assignmentFiles)
    .flat()
    // remove duplicates
    .filter((file, index, self) => self.indexOf(file) === index);

  // Get students for task
  const students = getConsentingStudents({ years: [22] });

  // Go through all students, and all their files and anonymise them
  students.forEach((student) => {
    assignmentFiles.forEach((file) => {
      // Read file
      try {
        const content = getSavedFile({
          filePath: file,
          studentId: student.id,
          task: task.value,
          originality: 'original',
        });

        // Anonymise file
        // In the files students have usually written "@author Firstname Lastname email@example.org"
        // All of these should be removed. To do this easily, one might do a regex to check for the author line and remove it entirely
        // Note, some student's have written @Author instead of @author, so check for multiple cases
        // Some students also write @see, which should not be removed
        const contentWithoutAtAuthor = content.replace(
          /(@author|@Author|@see).*/g,
          ''
        );

        // Remove any names from the files that may be written anywhere.
        // The names of the student's can be found in student.name.

        // Split the name into their different names (may be several)
        const names = student.name.split(' ');

        // Go through all names and replace them with "Student"
        const anonymisedContent = names.reduce(
          (content, name) => content.replace(new RegExp(name, 'g'), 'Student'),
          contentWithoutAtAuthor
        );

        // Write anonymised file to disk
        saveFile({
          path: `tests/task-${task.value}/submissions/anonymised/${student.id}/${file}`,
          content: anonymisedContent,
        });
      } catch (e) {
        console.log(`Could not find file ${file} for ${student.id}`);
      }
    });
  });
}
