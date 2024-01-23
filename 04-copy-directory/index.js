const { rm, mkdir, readdir, copyFile } = require('fs/promises');
const path = require('path');

const srcPath = path.join(__dirname, 'files');
const destPath = path.join(__dirname, 'files-copy');

rm(destPath, { recursive: true, force: true })
  .then(() => {
    return mkdir(destPath, { recursive: true });
  })
  .then(() => {
    return readdir(srcPath, { withFileTypes: true });
  })
  .then((files) => {
    for (const file of files) {
      if (file.isFile()) {
        copyFile(srcPath + '//' + file.name, destPath + '//' + file.name);
      }
    }
  })
  .catch((err) => {
    console.error(err);
  });
