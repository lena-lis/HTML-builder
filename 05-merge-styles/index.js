const { readdir, createReadStream, createWriteStream } = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'styles');
const destPath = path.join(__dirname, 'project-dist', 'bundle.css');
const writeStream = createWriteStream(destPath);

readdir(srcPath, { withFileTypes: true }, function (err, filenames) {
  if (err) console.error(err);
  for (const file of filenames) {
    if (file.isFile() || path.extname(file) === '.css') {
      const readStream = createReadStream(path.join(srcPath, file.name));
      readStream.pipe(writeStream);
    }
  }
});
