const { resolve } = require('path');
const { lstatSync, existsSync, mkdirSync, writeFileSync } = require('fs');

const resolvePath = (...paths) => resolve(...paths);
const isDirectory = path => lstatSync(path).isDirectory();
const validateDir = directory => !existsSync(directory) && mkdirSync(directory);

function validateFile(filePath) {
  if (!existsSync(filePath)) {
    writeFileSync(filePath, '', {
      encoding: 'utf8',
      mode: 0o600,
    });
  }
}

module.exports = {
  resolvePath,
  isDirectory,
  validateDir,
  validateFile,
};
