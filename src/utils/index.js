const { resolve, join } = require('path');
const { lstatSync, existsSync, mkdirSync, writeFileSync } = require('fs');

const { HOME } = process.env;

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

function addSSHKey(key) {
  console.log('HOME', HOME);

  const sshDir = join(HOME || __dirname, '.ssh');
  const filePath = join(sshDir, 'deploy_key');

  validateDir(sshDir);
  validateFile(`${sshDir}/known_hosts`);

  writeFileSync(filePath, key, {
    encoding: 'utf8',
    mode: 0o600,
  });

  return filePath;

  // await execSync('ssh-agent -s');
  // await execSync(`ssh-add ${sshPath}`);
}

module.exports = {
  resolvePath,
  isDirectory,
  validateDir,
  validateFile,
  addSSHKey,
};
