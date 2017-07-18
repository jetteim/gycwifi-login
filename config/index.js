var nconf = require('nconf');
var path = require('path');

if (process.env.NODE_ENV == 'production') {
    nconf.argv()
        .env()
        .file({file: path.join(__dirname, 'production.json')});
} else if (process.env.NODE_ENV == 'staging') {
  nconf.argv()
      .env()
      .file({file: path.join(__dirname, 'staging.json')});
} else {
    nconf.argv()
        .env()
        .file({file: path.join(__dirname, 'development.json')});
}
module.exports = nconf;
