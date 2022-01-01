const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const { SupportedPipelineTools, GIT_REPO } = require('./constants');

const getPipelineFolder = async (projectPath, pipelineTool) => {
  let oldPath = path.join(projectPath, 'pipeline/.circleci');
  let newPath = path.join(projectPath, '.circleci');

  if (pipelineTool === SupportedPipelineTools.GITHUB) {
    oldPath = path.join(projectPath, 'pipeline/.github');
    newPath = path.join(projectPath, '.github');

    fs.unlinkSync(
      path.join(projectPath, 'pipeline/.github/workflows/codeql-analysis.yml'),
    );
  }

  fs.renameSync(oldPath, newPath);
};

const formatPackageJson = (projectPath) => {
  const packageJsonPath = path.join(projectPath, 'package.json');
  const packageJson = require(packageJsonPath);

  delete packageJson.bin;
  delete packageJson.dependencies.commander;

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 4));
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

    fs.rmdirSync('./.git', { recursive: true });
    fs.rmdirSync('./pipeline', { recursive: true });
    fs.rmdirSync('./bin', { recursive: true });

    formatPackageJson(projectPath);

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
