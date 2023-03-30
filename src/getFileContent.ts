import octokit from './octokit';

async function getFileContent({
  owner,
  repo,
  path,
}: {
  owner: string;
  repo: string;
  path: string;
}) {
  const { data } = await octokit.rest.repos.getContent({
    owner,
    repo,
    path: 'src/' + path,
  });

  return Buffer.from((data as any).content.toString(), 'base64').toString(
    'utf-8'
  );
}

export default getFileContent;
