const NodeSSH = require('node-ssh');
const { join } = require('path');
const { writeFileSync } = require('fs');

const { validateDir, validateFile } = require('.');

function addSSHKey(key) {
  const sshDir = join(process.env.HOME || __dirname, '.ssh');
  const filePath = join(sshDir, 'deploy_key');

  validateDir(sshDir);
  validateFile(`${sshDir}/known_hosts`);

  writeFileSync(filePath, key, {
    encoding: 'utf8',
    mode: 0o600,
  });

  return filePath;
}

async function connectSSH(filePath) {
  const ssh = new NodeSSH();

  await ssh.connect({
    port: 22,
    host: 'localhost',
    username: 'pablo1v',
    privateKey: filePath,
  });

  await ssh.exec('ls -a', []);

  ssh.dispose();
  return ssh;
}

module.exports = {
  addSSHKey,
  connectSSH,
};
