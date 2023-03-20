const fs = require('fs');

// Function to get the submission file for the student, stored in `../submissions/task-${task}/submissions/${student}.txt`
function getSubmission(task, assignment, student) {
  return fs.readFileSync(`./../tests/task-${task}/submissions/${student}/${assignment}`, 'utf8');
}

module.exports = getSubmission;
