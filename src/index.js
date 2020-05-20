const io = require('@actions/io');
const exec = require('@actions/exec');
const core = require('@actions/core');

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
      if (!core.getInput(input)) throw new Error(`No ${input} was provided.`);
    });

    const userName = core.getInput('user-name');
    const userEmail = core.getInput('user-email');
    const localePath = core.getInput('locale-path');
    const uploadPath = core.getInput('upload-path');
    const targetRepository = core.getInput('target-repository');

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

    console.log({ localeFiles });

    await Promise.all(
      localeFiles.map(file => {
        return io.cp(
          file,
          file.replace(localePathResolved, uploadPathResolved),
          {
            recursive: true,
            force: true,
          },
        );
      }),
    );

    const options = { cwd: uploadPathResolved };

    await exec.exec('git', ['config', 'user.name', `"${userName}"`], options);
    await exec.exec('git', ['config', 'user.email', `"${userEmail}"`], options);
    await exec.exec('git', ['add', '.'], options);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }

  try {
    await exec.exec('git', ['commit', '-m', '"Upload Translates"'], options);
    await exec.exec('git', ['push'], options);
  } catch (e) {
    console.error(e);
  }
}

run();
