const fs = require('fs');
const path = require('path');

const { DIR_PATH } = require('./Constants');

const resolvePath = (...paths) => path.resolve(...paths);

function readdir(directory) {
  const directoryPath = resolvePath(DIR_PATH, directory);
  const files = fs.readdirSync(directoryPath);

  return files
    .map(file => {
      const fileFullPath = resolvePath(directoryPath, file);

      if (/\.json$/.test(file)) {
        return require(fileFullPath);
      }

      return false;
    })
    .filter(_module => _module);
}

module.exports = {
  resolvePath,
  readdir,
};
