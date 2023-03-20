const fs = require('fs');

// Function to get the submission file for the student, stored in `../submissions/task-${task}/submissions/${student}.txt`
function getSubmission(task, student) {
  return fs.readFileSync(`./../tests/task-${task}/submissions/${student}.txt`, 'utf8');
}

module.exports = getSubmission;
