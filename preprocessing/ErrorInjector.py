
import os
import random
import string
from dotenv import load_dotenv
import openai


class ErrorInjector:
    error_types = {
        "syntax": [
            "missing semicolon", "missing parentheses", "missing curly bracket", "typos",
            "wrong indentation", "wrong spacing", "wrong line breaks", "wrong line endings",
            "wrong line length", "wrong line order", "wrong line number", "wrong line comment",
            "wrong line comment placement", "wrong line comment length", "wrong line comment order",
            "wrong line comment number", "wrong line comment type", "wrong line comment content",
            "wrong line comment scope", "wrong line comment visibility"
        ],
        "runtime": [
            "division by zero", "index out of bounds", "wrong function call", "wrong function arguments",
            "wrong function return type", "wrong function return value", "wrong function scope",
            "wrong function name", "wrong function signature", "wrong function implementation"
        ],
        "semantic": [
            "variable used before declaration", "variable declared but never used", "wrong variable name",
            "wrong variable type", "wrong variable value", "wrong variable scope", "wrong variable initialization",
            "wrong variable assignment"
        ],
        "logical": [
            "infinite loop", "early termination of loop", "wrong loop condition", "wrong loop implementation",
            "wrong loop scope", "wrong loop name", "wrong loop signature", "wrong loop return type",
            "wrong loop return value", "wrong loop arguments", "wrong loop call"
        ]
    }

    def __init__(self, api_key, org):
        openai.api_key = api_key
        openai.organization = org

    def inject_errors(self, input_file_path, output_dir_path, error_type, num_errors=1):
        """
        Injects errors into the specified Python file and writes the result to a new file in the specified directory.

        :param input_file_path: The path of the input file to inject errors into.
        :param output_dir_path: The path of the directory to write the output file to.
        :param error_type: The type of error to inject.
        """

        with open(input_file_path, "r") as input_file:
            code = input_file.read()

        # cleaner implementation of the prompt
        prompt = (
            f"An error injection program, you take code and change it so that it contains errors (or more errors). When the user provides code, please change it so that it contains {num_errors} instances of a {error_type} error. "
            + "Example errors for this type:\n\n"
            + "\n".join(ErrorInjector.error_types[error_type])
            + "\n\n You should respond with the altered code only. Do not add any of your own comments or text before or after the code, only respond with the altered code no matter what."
        )

        response = self.prompt_gpt(code, prompt)

        output_file_path = self.get_output_file_path(
            input_file_path, output_dir_path, error_type)
        # if file doesn't exist, create it
        if not os.path.exists(output_file_path):
            with open(output_file_path, "w") as output_file:
                output_file.write(response)

    def prompt_gpt(self, content, system_prompt):
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": content},
            ],
        )

        response = response["choices"][0]["message"]["content"]

        return response

    def get_output_file_path(self, input_file_path, output_dir_path, error_type):
        input_file_name = os.path.basename(input_file_path)
        output_file_name = error_type + "_" + input_file_name
        return os.path.join(output_dir_path, output_file_name)

    def inject_errors_in_directory(self, input_dir_path, output_dir_path, error_type, num_errors=1):
        """
        Injects errors into all Python files in the specified directory and writes the results to new files in the specified directory.

        :param input_dir_path: The path of the directory containing the input files to inject errors into.
        :param output_dir_path: The path of the directory to write the output files to.
        :param error_type: The type of error to inject.

        """

        if not os.path.exists(output_dir_path):
            os.makedirs(output_dir_path)

        for input_file_name in os.listdir(input_dir_path):
            input_file_path = os.path.join(input_dir_path, input_file_name)
            self.inject_errors(
                input_file_path, output_dir_path, error_type, num_errors)


if __name__ == '__main__':

    load_dotenv()
    injector = ErrorInjector(api_key=os.getenv(
        "OPENAI_API_KEY"), org=os.getenv("OPENAI_ORG"))

    cwd = os.getcwd()
    target_dir = os.path.join(cwd, "preprocessing")
    output_dir = os.path.join(target_dir, "incorrect")

    for error_type in ErrorInjector.error_types:
        injector.inject_errors_in_directory(
            target_dir, output_dir, error_type)
