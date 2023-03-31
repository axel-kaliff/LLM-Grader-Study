import getChatGPTResponse from './openai/getChatGPTResponse';
import fs from 'fs';
import getSavedFile from './getSavedFile';
import saveFile from './saveFile';

// Get base prompt from baseprompt.txt
const basePrompt = fs.readFileSync('./src/baseprompt.txt', 'utf8');

export default async function gradeAssignment({
  studentId,
  task,
  assignmentFiles,
  exercise,
}: {
  studentId: string;
  task: number;
  assignmentFiles: string[];
  exercise: number;
}) {
  // Get student's code
  try {
    const studentCode = assignmentFiles.map((filePath) => {
      return getSavedFile({
        filePath,
        studentId,
        task,
        originality: 'anonymised',
      });
    });

    // Get the exercise prompt from
    const exercisePrompt = fs.readFileSync(
      `tests/task-${task}/prompts/${exercise}/instruction.md`,
      'utf8'
    );

    getChatGPTResponse([
      {
        content: basePrompt,
        role: 'system',
      },
      {
        content: `${exercisePrompt}\n\nStudent code:\n${studentCode
          .map((code) => code)
          .join('')}`,
        role: 'user',
      },
    ]).then((response) => {
      saveFile({
        path: `tests/task-${task}/submissions/graded/${studentId}/${exercise}.txt`,
        content: response,
      });
    });
  } catch (e) {
    console.log("Couldn't get file");
  }
}
