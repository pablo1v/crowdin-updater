const io = require('@actions/io');
const exec = require('@actions/exec');
const core = require('@actions/core');

const { isDirectory, resolvePath } = require('./utils');
const { DIR_PATH } = require('./utils/constants');
const cloneTranslationRepository = require('./clone');

async function run() {
  try {
    console.log({ token: core.getInput('token') });

    ['token', 'locale-path', 'upload-path'].forEach(input => {
      if (!core.getInput(input)) throw new Error(`No ${input} was provided.`);
    });

    const repository = core.getInput('repository');
    const token = core.getInput('token');

    const localePath = core.getInput('locale-path');
    const uploadPath = core.getInput('upload-path');

    const [owner, repo] = repository.split(/\//g);
    const repositoryName = repo || owner;

    const localePathResolved = resolvePath(
      DIR_PATH,
      repositoryName,
      repositoryName,
      localePath,
    );

    if (!isDirectory(localePathResolved)) {
      throw new Error('The locale path entered is not a absolute path.');
    }

    const { clonePath } = await cloneTranslationRepository();
    const uploadPathResolved = resolvePath(clonePath, uploadPath);

    if (!isDirectory(uploadPathResolved)) {
      throw new Error('The upload path entered is not a absolute path.');
    }

    await io.cp(localePathResolved, uploadPathResolved, {
      recursive: true,
      force: true,
    });

    const options = { cwd: uploadPathResolved };

    await exec.exec('export ', [`GITHUB_TOKEN=${token}`], options);

    await exec.exec('git', ['config', 'user.name', '"Example"'], options);
    await exec.exec(
      'git',
      ['config', 'user.email', '"you@example.com"'],
      options,
    );

    await exec.exec('git', ['add', '.'], options);
    await exec.exec('git', ['commit', '-m', '"Upload Translates"'], options);
    await exec.exec('git', ['push'], options);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

run();
