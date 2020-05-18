const fs = require('fs');
const path = require('path');
const core = require('@actions/core');

const cloneTranslationRepository = require('./clone');

async function run() {
  const token = core.getInput('token');
  const repository = core.getInput('repository');
  const sshKkey = core.getInput('ssh-key');

  console.log(
    'folder',
    fs.readdirSync(path.resolve(__dirname, '..', '..', '..', '..')),
  );

  // console.log({ token, repository, sshKkey });

  // const { cloneUniqueID, clonePath } = await cloneTranslationRepository();
  // console.log({ cloneUniqueID, clonePath });
}

run();
