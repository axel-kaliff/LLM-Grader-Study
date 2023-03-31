import sys
# Get args from command line and print them
# we have "id" "taskNumber" "assignmentFile" "errorType"

# print args
print("id: " + sys.argv[1])
print("taskNumber: " + sys.argv[2])
print("assignmentFile: " + sys.argv[3])
print("errorType: " + sys.argv[4])

# Print file path
print("File path: " + "tests/task-" + sys.argv[2] + "/submissions/error-" + sys.argv[4] + "/" + sys.argv[3])

