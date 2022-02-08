#! /usr/bin/env node

'use strict';

const path = require('path');
const { Command } = require('commander');
const program = new Command();
const { setupPackage, createPipelineTemplate } = require('./setupTemplate');
const { setupFolder, validateSupportedPipeline } = require('./validator');

program
  .command('init <project_name>')
  .description('Initialize a new project')
  .option(
    '-p, --pipeline_tool <pipeline>',
    `pipeline tool [circleci, github]`,
    'cirlceci',
  )
  .option('-ioc, --ioc', `IOC container`)
  .action((projectName, options) => {
    const { pipeline_tool: pipelineTool, ioc } = options;

    const currentPath = process.cwd();
    const projectPath = path.join(currentPath, projectName);

    setupFolder(projectPath);

    setupPackage(projectPath, pipelineTool, ioc);
  });

program
  .command('create-pipeline <pipeline_tool>')
  .description('Create pipeline template')
  .action((pipelineTool) => {
    validateSupportedPipeline(pipelineTool);

    const currentPath = process.cwd();

    createPipelineTemplate(currentPath, pipelineTool);
  });

program.parse(process.argv);
