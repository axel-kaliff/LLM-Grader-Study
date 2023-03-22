# Most of our data only contain correct solutions
# In order to test the capabilities of the system to detect incorrectness we need to augment to data to contain errors

# make injector class
# input: txt file
# output: txt file with errors

from FileFetcher import Repo

class ErrorInjector:

    def inject_errors_into_repo(self, repos):
        for repo in repos:
            for file in repo.files:
                self.inject_errors_into_file(file)

    def inject_errors_into_file(self , target_file_path):
        # step 1
        # Load the file
        with open(target_file_path, "r") as f:
            lines = f.readlines()


        # get file extension from file path
        file_extension = target_file_path.split(".")[-1]


        # convert lines into a string
        code = ""
        for line in lines:
            code += line

        # Ask GPT4 to insert erroneus code
        import openai
        import os
        
    # import openai api key from .env file 
        from dotenv import load_dotenv
        load_dotenv()

        openai.api_key = os.getenv("OPENAI_API_KEY")

        # TODO add a prompt that asks for the type of error

        system_prompt = "You are an enthusiastic and thurough teaching assistant for a university progamming course. Your job is to make examples of erroneous code by taking correct code and inserting errors into it. Errors can include logical errors, syntax error or errors that will result in runtime errors. Please preface your response with the errors you implemented, then add a line of dashes before you return the erroneous code. You are given the following code:"

        response = openai.ChatCompletion.create(
            model = "gpt-3.5-turbo",
            messages = [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": code}, 
            ],
        )

        response = response["choices"][0]["message"]["content"]

        import os
        from os import path

        # get current working directory
        cwd = os.getcwd()

        # write the response to a file
        file_name = target_file_path.split(".")[0] + "_incorrect." + file_extension
        file_path = cwd + "/incorrect/"
        if not path.exists(file_name):
            # create file

            with open(f"{file_name}", "w") as f: 
                f.write(response)
        else:
            print("File already exists")


# Example usage
injector = ErrorInjector("pre-processing/data-collector.py")
injector.inject()

# main function
if __name__ == "__main__":
    # get all files in the data collector folder
    import os
    from os import path


    # get current working directory
    cwd = os.getcwd()

    # get all files in the data collector folder
    file_path = cwd
    files = os.listdir(file_path)

    # loop through all files
    for file in files:
        # check if file is a python file
        if file.endswith(".py"):
            # make injector
            injector = ErrorInjector(file_path + file)
            injector.inject()
