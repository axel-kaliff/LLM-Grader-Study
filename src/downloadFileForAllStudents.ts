import getAndSaveFile from './downloadFile';

interface Student {
  id: string;
  year: number;
}

function downloadFileForAllStudents({
  students,
  filePath,
  task,
}: {
  students: Student[];
  filePath: string;
  task: number;
}) {
  students.forEach((student) => {
    getAndSaveFile({
      owner: `inda-${student.year}`,
      repo: `${student.id}-task-${task}`,
      path: filePath,
      savePath: `tests/task-${task}/submissions/original/${student.id}/${filePath}`,
    });
  });
}

export default downloadFileForAllStudents;
