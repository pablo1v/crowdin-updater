const fs = require('fs');
const path = require('path');
const exec = require('@actions/exec');

const resolvePath = (...paths) => path.resolve(...paths);
const isDirectory = path => fs.lstatSync(path).isDirectory();

async function addSSHKey(key) {
  const sshPath = resolvePath('~/.ssh', 'key.pub');

  console.log(sshPath);

  fs.writeFileSync(sshPath, key);

  const options = { cwd: '~/.ssh' };

  await exec.exec(`ssh-add ${sshPath}`, options);
}

module.exports = {
  resolvePath,
  isDirectory,
  addSSHKey,
};
