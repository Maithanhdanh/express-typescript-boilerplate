#! /usr/bin/env node

'use strict';

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

if (process.argv.length < 3) {
  console.log('You have to provide a name to your app.');
  console.log('For example :');
  console.log('    npx create-typescript-maker my-app');
  console.log('    OR');
  console.log('    npm init typescript-maker my-app');
  process.exit(1);
}

const projectName = process.argv[2];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);
const git_repo =
  'https://github.com/Maithanhdanh/express-typescript-boilerplate.git';

try {
  fs.mkdirSync(projectPath);
} catch (err) {
  if (err.code === 'EEXIST') {
    console.log(
      'Directory already exists. Please choose another name for the project.',
    );
  } else {
    console.log(err);
  }
  process.exit(1);
}

async function main() {
  try {
    console.log('Downloading files...');
    execSync(`git clone --depth 1 ${git_repo} ${projectPath}`);

    // Change directory
    process.chdir(projectPath);

    console.log('Removing useless files');
    fs.unlinkSync(path.join(projectPath, 'SECURITY.md'));
    fs.unlinkSync(
      path.join(projectPath, '.github/workflows/codeql-analysis.yml'),
    );
    fs.unlinkSync(path.join(projectPath, 'bin', 'generateApp.js'));
    fs.rmdirSync(path.join(projectPath, 'bin'));
    execSync('npx rimraf ./.git');

    console.log('Initializing project successfully!!!');
    console.log();
    console.log('DantisMai =>> Thank you very much');
  } catch (error) {
    console.log(error);
  }
  console.log();
  console.log(
    'Any comments or questions are welcome!, mtd.maithanhdanh@gmail.com',
  );
}
main();
