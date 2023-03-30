import fs from 'fs';

function saveFile({ path, content }: { path: string; content: string }) {
  // If the directory doesn't exist, create it
  const directory = path.split('/').slice(0, -1).join('/');
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
  // Write the file to disk
  fs.writeFileSync(path, content);
}

export default saveFile;
