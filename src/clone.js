const path = require('path');
const exec = require('@actions/exec');
const { v4: uuid } = require('uuid');

async function cloneRepository(repository) {
  const cloneUniqueID = uuid();
  const clonePath = path.resolve(__dirname, '..', cloneUniqueID);

  await exec.exec('git', ['clone', repository, clonePath], {
    cwd: path.resolve(__dirname, '..'),
  });

  return {
    cloneUniqueID,
    clonePath,
  };
}

module.exports = cloneRepository;
