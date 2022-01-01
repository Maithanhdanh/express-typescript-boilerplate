#! /usr/bin/env node

'use strict';

const path = require('path');
const { Command } = require('commander');
const program = new Command();
const { setupPackage } = require('./setupPackage');
const { validatePath } = require('./utils');

program
  .command('init')
  .arguments('<project-name>')
  .option(
    '-p, --pipeline-tool <pipeline>',
    `pipeline tool [circleci, github]`,
    'cirlceci',
  )
  .action((projectName, options) => {
    console.log(options);
    const { pipelineTool } = options;

    const currentPath = process.cwd();
    const projectPath = path.join(currentPath, projectName);

    validatePath(projectPath);

    console.log(projectPath);
    if (!projectName) {
      console.log('You have to provide a name to your app.');
      console.log('For example :');
      console.log('    typescript-maker my-app');
      process.exit(1);
    }

    setupPackage(projectPath, pipelineTool);
  })
  .parse(process.argv);
