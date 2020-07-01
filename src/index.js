const ioAction = require('@actions/io');
const execAction = require('@actions/exec');
const coreAction = require('@actions/core');

const cloneRepository = require('./clone');
const { isDirectory, resolvePath, getTranslateFiles } = require('./utils');

const { GITHUB_WORKSPACE } = process.env;

async function run() {
  try {
    [
      'locale-path',
      'upload-path',
      'target-repository',
      'user-name',
      'user-email',
    ].forEach(input => {
      if (!coreAction.getInput(input)) {
        throw new Error(`No ${input} was provided.`);
      }
    });

    const userName = coreAction.getInput('user-name');
    const userEmail = coreAction.getInput('user-email');
    const localePath = coreAction.getInput('locale-path');
    const uploadPath = coreAction.getInput('upload-path');
    const commitMessage = coreAction.getInput('commit-message');
    const targetRepository = coreAction.getInput('target-repository');

    const localePathResolved = resolvePath(GITHUB_WORKSPACE, localePath);

    if (!isDirectory(localePathResolved)) {
      throw new Error('The locale path entered is not a absolute path.');
    }

    const { clonePath } = await cloneRepository(targetRepository);
    const uploadPathResolved = resolvePath(clonePath, uploadPath);

    if (!isDirectory(uploadPathResolved)) {
      throw new Error('The upload path entered is not a absolute path.');
    }

    const localeFiles = getTranslateFiles(localePathResolved);

    await Promise.all(
      localeFiles.map(file => {
        return ioAction.cp(
          file,
          file.replace(localePathResolved, uploadPathResolved),
          {
            force: true,
            recursive: true,
          },
        );
      }),
    );

    const options = { cwd: uploadPathResolved };
    const exec = args => execAction.exec('git', args, options);

    await Promise.all(
      exec(['config', 'user.name', `"${userName}"`]),
      exec(['config', 'user.email', `"${userEmail}"`]),
      exec(['add', '.']),
    );

    try {
      await Promise.all(
        exec(['commit', '-m', `"${commitMessage}"`]),
        exec(['push']),
      );
    } catch (e) {
      // Not Exit Process
    }
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

run();
