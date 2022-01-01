const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const { SupportedPipelineTools, GIT_REPO } = require('./constants');

const getPipelineFolder = async (projectPath, pipelineTool) => {
  let oldPath = path.join(projectPath, 'pipeline/.circleci');
  let newPath = path.join(projectPath, '.circleci');

  if (pipelineTool === SupportedPipelineTools.CIRCLECI) {
    oldPath = path.join(projectPath, 'pipeline/.github');
    newPath = path.join(projectPath, '.github');

    fs.unlinkSync(
      path.join(projectPath, '.github/workflows/codeql-analysis.yml'),
    );
  }

  fs.renameSync(oldPath, newPath);
};

const setupPackage = async (projectPath, pipelineTool) => {
  try {
    console.log('Downloading files...');
    execSync(`git clone --depth 1 ${GIT_REPO} ${projectPath}`);

    process.chdir(projectPath);
    getPipelineFolder(projectPath, pipelineTool);

    console.log('Removing useless files');
    fs.unlinkSync(path.join(projectPath, 'SECURITY.md'));
    fs.unlinkSync(path.join(projectPath, 'CHANGELOG.md'));
    fs.unlinkSync(path.join(projectPath, 'package-lock.json'));

    execSync('npx rimraf ./.git');
    execSync('npx rimraf ./pipeline');
    execSync('npx rimraf ./bin');
    execSync('npm uninstall commander --save');

    console.log('Initializing project successfully!!!');
    console.log();
    console.log('Dantis Mai =>> Thank you very much');
  } catch (error) {
    console.log(error);
  }
  console.log();
  console.log(
    'Any comments or questions are welcome!, mtd.maithanhdanh@gmail.com',
  );
};

module.exports = { setupPackage };
