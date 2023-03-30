import fs from 'fs';

export default function getSavedFile({
  filePath,
  studentId,
  task,
  originality = 'anonymised',
}: {
  filePath: string;
  studentId: string;
  task: number;
  originality?: string;
}) {
  // Read file from disk, `tests/task-${year}/originality/${studentId}/${filePath}`
  const file = fs.readFileSync(
    `tests/task-${task}/submissions/${originality}/${studentId}/${filePath}`,
    'utf8'
  );

  return file;
}
