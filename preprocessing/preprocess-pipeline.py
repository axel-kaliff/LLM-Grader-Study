# import FileFetcher class from 'file-fetcher' 
import FileFetcher
import ErrorInjector

# define access token and organization name
org_name = "KTH-15"

# get access token from .env file
import os
from dotenv import load_dotenv

load_dotenv()

access_token = os.getenv("GITHUB_ACCESS_TOKEN")


# create a FileFetcher object
fetcher = FileFetcher.FileFetcher(access_token)

# define keywords to search for
keywords = ["task-12", "task-13", "task-14"]

# get all repos for the given organization and keywords
repos = fetcher.get_repos(org_name, keywords)

# define files to fetch for each repo
files = [
    ["src/LinkedList.java", "src/LinkedListTest.java"],
    ["src/binarySearchTree.java", "src/binarySearchTreeTest.java", "docs/answers.md"],
    ["src/bfs.java", "src/bfsTest.java", "docs/answers.md"]
]


# create a list of Repo objects
repos = [FileFetcher.Repo(repo_name, files) for repo_name, files in zip(repos, files)]

# fetch and save files for all repos
fetcher.batch_crawl_repos(repos)

# inject errors into the files
error_injector = ErrorInjector.ErrorInjector()
error_injector.inject_errors(repos)







