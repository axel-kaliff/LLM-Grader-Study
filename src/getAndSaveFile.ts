import getFileContent from './getFileContent';
import saveFile from './saveFile';

function getAndSaveFile({
  owner,
  repo,
  path,
  savePath,
}: {
  owner: string;
  repo: string;
  path: string;
  savePath: string;
}) {
  getFileContent({ owner, repo, path })
    .then((file) => {
      saveFile({ path: savePath, content: file });
    })
    .catch(() => {
      console.log(`Couldn't download file ${path} from ${owner}/${repo}`);
    });
}

export default getAndSaveFile;
