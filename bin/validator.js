const fs = require('fs');
const { SupportedPipelineTools } = require('./constants');

const setupFolder = (projectPath) => {
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
};

const validateSupportedPipeline = (pipeline) => {
  if (
    ![SupportedPipelineTools.CIRCLECI, SupportedPipelineTools.GITHUB].includes(
      pipeline,
    )
  ) {
    console.log(
      'Your pipeline tool is not supported currently. Please choose one of the following: circleci, github',
    );
    process.exit(1);
  }
};

module.exports = { setupFolder, validateSupportedPipeline };
