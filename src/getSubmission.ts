import fs from 'fs';

type GetSubmission = (params: {
  task: number;
  studentId: string;
  file: string;
  originality?: string;
}) => string;

const getSubmission: GetSubmission = ({
  task,
  studentId,
  file,
  originality = 'original',
}) => {
  // Work from the root of the project
  const root = process.cwd();

  // Get the path to the submission
  const pathAccordingToRoot = `tests/task-${task}/submissions/${originality}/${studentId}/${file}`;

  // Read the file
  const submission = fs.readFileSync(`${root}/${pathAccordingToRoot}`, 'utf8');

  return submission;
};

export default getSubmission;
