const fs = require('fs');
const { readdir } = require('fs/promises');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

const files = readdir(folderPath, {
  withFileTypes: true,
});

files.then((filenames) => {
  for (let filename of filenames) {
    if (filename.isFile()) {
      const filePath = path.join(folderPath, filename.name);
      const fileParsed = path.parse(filePath);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error(err);
        }
        console.log(
          fileParsed.name +
            ' - ' +
            path.extname(filePath).slice(1) +
            ' - ' +
            stats.size / 1024 +
            'kb',
        );
      });
    }
  }
});
