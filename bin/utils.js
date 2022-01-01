const fs = require('fs');

const validatePath = (projectPath) => {
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

module.exports = { validatePath };
