const fs = require('fs');
const path = require('path');
const exec = require('@actions/exec');

const resolvePath = (...paths) => path.resolve(...paths);
const isDirectory = path => fs.lstatSync(path).isDirectory();

async function addSSHKey(key) {
  const sshPath = resolvePath('..', 'key.pub');

  fs.writeFileSync(sshPath, key, { encoding: 'utf-8' });

  await exec.exec('eval', ['ssh-agent -s']);
  await exec.exec('ssh-add', ['-K', sshPath]);
}

module.exports = {
  resolvePath,
  isDirectory,
  addSSHKey,
};
