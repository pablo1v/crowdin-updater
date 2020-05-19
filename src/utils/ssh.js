const NodeSSH = require('node-ssh');
const { join } = require('path');

const { validateDir } = require('.');

const { HOME } = process.env;

function addSSHKey(key) {
  const sshDir = join(HOME || __dirname, '.ssh');
  const filePath = join(sshDir, 'deploy_key.pub');

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

  await ssh.exec('ls -a', [], {
    stream: 'both',
    onStdout(chunk) {
      console.log(chunk.toString('utf8'));
    },
    onStderr(chunk) {
      console.log(chunk.toString('utf8'));
    },
  });

  ssh.dispose();
  return ssh;
}

module.exports = {
  addSSHKey,
  connectSSH,
};
