const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const { isPathExist } = require('./utils');
const {
  SupportedPipelineTools,
  GIT_REPO,
  PipelinePathMapper,
  PipelineConfigMapper,
} = require('./constants');

const getPipelineFolder = (projectPath, pipelineTool) => {
  let oldPath = path.join(projectPath, 'pipeline/.circleci');
  let newPath = path.join(projectPath, '.circleci');

  if (pipelineTool === SupportedPipelineTools.GITHUB) {
    oldPath = path.join(projectPath, 'pipeline/.github');
    newPath = path.join(projectPath, '.github');
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

const setupPackage = (projectPath, pipelineTool, ioc = false) => {
  try {
    console.log('Downloading files...');

    execSync(
      `git clone --branch ${ioc ? 'ioc' : 'main'} ${GIT_REPO} ${projectPath}`,
    );

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

const publishTemplate = (projectPath, templatePath, pipelineTool) => {
  const oldPath = path.join(
    templatePath,
    `pipeline/${PipelinePathMapper[pipelineTool]}`,
  );
  fs.renameSync(oldPath, `${oldPath}`);
  const newPath = path.join(projectPath, `${PipelinePathMapper[pipelineTool]}`);

  fs.renameSync(oldPath, newPath);
};

const createPipelineTemplate = (projectPath, pipelineTool) => {
  if (isPathExist(PipelineConfigMapper[pipelineTool])) {
    console.log(
      'the config file is already existed, please delete it before create new one',
    );
    process.exit(1);
  }

  const projectName = Math.random().toString(36).substr(2, 13);
  const templatePath = path.join(projectPath, projectName);
  const pipelinePath = path.join(
    projectPath,
    `${PipelinePathMapper[pipelineTool]}`,
  );

  if (!isPathExist(pipelinePath)) {
    fs.mkdirSync(pipelinePath, { recursive: true });
  }

  execSync(`git clone ${GIT_REPO} ${templatePath}`);
  publishTemplate(projectPath, templatePath, pipelineTool);

  fs.rmdirSync(templatePath, { recursive: true });

  console.log(
    `Create pipeline template successfully, have fun with it in folder '${PipelinePathMapper[pipelineTool]}'`,
  );
};

module.exports = { setupPackage, createPipelineTemplate };
