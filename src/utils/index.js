const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const resolvePath = (...paths) => path.resolve(...paths);
const isDirectory = path => fs.lstatSync(path).isDirectory();

async function addSSHKey(key) {
  const sshPath = resolvePath('..', '..', 'key.pub');

  console.log(sshPath);

  fs.writeFileSync(sshPath, key);

  await execSync('ssh-agent -s');
  await execSync(`ssh-add ${sshPath}`);
}

module.exports = {
  resolvePath,
  isDirectory,
  addSSHKey,
};
