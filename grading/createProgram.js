const getChatGPTResponse = require('./../misc/getChatGPTResponse.js');

getChatGPTResponse([{
  "role": "user",
  "content": 
`
Hi, I want to do a Node.js program that will help me execute a script that will grade some assignments. The program in itself does not need to worry about grading - but it simply needs to help me select what tasks and exercises to grade.

The structure of the program should roughly be the following:

* Which task do you want to do? (Select "all" or one of the options below)
* Which exercise? (Select "all" or one of the options below)
* Which student? (Select "all" or one of the options below)

After selecting these things, it should run a specific function with those arguments, in this case, something like gradeAssignments(...)

The list of tasks are found inside a JSON file which has the following structure: { [task_number]: [ { "exercise_name", "assignmentFiles": [ ...files ] } ] }
The exercises for the specific task is the "exercise_name".
The students are found by a function which sees for which students there exist a submitted folder. To do this, the program should use a function called something like getStudentsForTask() which goes to this file path and check what folder names (student ids exist) \`./../tests/task-{task_number}/submissions/original/\`

You are very welcome to use some NPM packages that I have to download to make the interface easier when selecting things etc.

Ideally, I would also like the program to be able to take in arguments for the things that one needs to select so one can just skip the "selection" process of the program.
`
}]).then((response) => {
  console.log(response);
})
