const fs = require('fs');
const path = require('path');

const writeStream = fs.createWriteStream(path.join(__dirname, 'lorem.txt'));
const { stdin, stdout } = process;

const sayGoodbye = () => {
  stdout.write('Goodbye!');
  process.exit();
};

stdout.write('Enter any text, please, and it will be written to a lorem.txt\n');

stdin.on('data', (dataChunk) => {
  if (dataChunk.toString().trim() === 'exit') {
    sayGoodbye();
  }
  writeStream.write(dataChunk);
});

process.on('SIGINT', () => sayGoodbye());
