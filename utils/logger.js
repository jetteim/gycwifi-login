const fs = require('fs');
const morgan = require('morgan');

module.exports = function(app, ENV) {
    if (ENV == "production") {
        var accessLogStream = fs.createWriteStream("./" + "production.log", {flags: 'a'});
        app.use(morgan('combined', {stream: accessLogStream}));
    } else if (ENV == "staging") {
      var accessLogStream = fs.createWriteStream("./" + "staging.log", {flags: 'a'});
      app.use(morgan('combined', {stream: accessLogStream}));
    } else {
      app.use(morgan("dev")); //log to console on development
    }
};
