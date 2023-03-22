# LLM-Grader-Study

A quantative study exploring the potential for LLMs to be used for automatic grading of university programming solutions.

## Components

- Data pre-processing pipeline
- LLM API inference pipeline (connecting to existing LLM for grading recommendation)
- Post inference analysis

## TODO

Data processing:

- Define specs for data, needs to fit into ChatGPT API (ChatML markup language)
- Write problem-injector (takes correct solutions and adds problems, use these for testing grading capabilities on incorrect solutions)
- Write text-to-prompt transformer (takes txt file of submitted answer, converts into ChatML and adds prompt)
- Write prompt-variation transformer (takes propmt, changes it slightly, used to find best prompt over many iterations)
- (done) Decide LLM API
- add spec for answer-handler, what should we keep in database? (What prompt was used, what level of context, is "roleplaying" happening, what task is it concerning)
- add answer-handler, takes GPT response, adds outcome (correct classification or not) as well as additional feedback to a database.

## Questions

- Can we use optimization methods such as bayesian hyperparameter tuning? If so, what could be tuned?

## File structure

- tests
  - task-XX
    - submissions
      - 1
        - correct
          - file1
          - file2
        - incorrect_1
          - file1
          - file2
        - incorrect_math_error
          - file1
