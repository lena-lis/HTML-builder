const { mkdir, readdir, copyFile, unlink } = require('fs/promises');
const path = require('path');

const srcPath = path.join(__dirname, 'files');
const destPath = path.join(__dirname, 'files-copy');

async function deleteFiles() {
  const files = await readdir(destPath);
  for (const file of files) {
    const filePath = path.join(destPath, file);
    unlink(filePath);
  }
}

async function makeDirectory() {
  try {
    const destFolder = path.join(__dirname, 'files-copy');
    const dirCreation = await mkdir(destFolder, {
      recursive: true,
    });
    return dirCreation;
  } catch (err) {
    console.error(err);
  }
}

async function copyFiles(from, to) {
  const srcFolder = await readdir(from, { withFileTypes: true });
  for (const file of srcFolder) {
    if (file.isFile()) {
      await copyFile(from + '//' + file.name, to + '//' + file.name);
    }
  }
}

deleteFiles();
makeDirectory();
copyFiles(srcPath, destPath);
