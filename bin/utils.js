const fs = require('fs');

const isPathExist = (path) => {
  return fs.existsSync(path) ? true : false;
};

module.exports = { isPathExist };
