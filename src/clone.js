const path = require('path');
const { v4: uuid } = require('uuid');
const { execSync } = require('child_process');

async function cloneTranslationRepository() {
  const cloneUniqueID = uuid();
  const clonePath = path.resolve(__dirname, '..', cloneUniqueID);

  await execSync(
    `git clone https://github.com/Kaeltec/localization.git ${clonePath}`,
    {
      cwd: path.resolve(__dirname, '..'),
    },
  );

  return {
    cloneUniqueID,
    clonePath,
  };
}

module.exports = cloneTranslationRepository;
