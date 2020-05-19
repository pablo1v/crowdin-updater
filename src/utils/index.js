const fs = require('fs');
const path = require('path');

const { DIR_PATH } = require('./Constants');

const resolvePath = (...paths) => path.resolve(...paths);

function readdirFiles(repositoryName, localePath) {
  const directoryPath = resolvePath(DIR_PATH, repositoryName, localePath);

  return fs
    .readdirSync(directoryPath)
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
  readdirFiles,
};
