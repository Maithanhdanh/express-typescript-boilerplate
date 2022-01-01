#! /usr/bin/env node

'use strict';

const path = require('path');
const { Command } = require('commander');
const program = new Command();
const { setupPackage } = require('./setupPackage');
const { validatePath } = require('./utils');

program
  .command('init <project_name>')
  .option(
    '-p, --pipeline_tool <pipeline>',
    `pipeline tool [circleci, github]`,
    'cirlceci',
  )
  .action((projectName, options) => {
    const { pipeline_tool: pipelineTool } = options;

    const currentPath = process.cwd();
    const projectPath = path.join(currentPath, projectName);

    validatePath(projectPath);

    setupPackage(projectPath, pipelineTool);
  });

program.parse(process.argv);
