const fs = require('fs');

// Function to get the submission file for the student, stored in `../submissions/task-${task}/submissions/${student}.txt`
function getSubmission(taskNumber, assignmentFile, studentNumber) {
  return fs.readFileSync(`./../tests/task-${taskNumber}/submissions/original/${studentNumber}/${assignmentFile}`, 'utf8');
}

module.exports = getSubmission;
