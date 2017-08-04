'use strict';
module.exports = (fs) => {
  return {
    clientReport: (request, response, next) => {
      const message = JSON.stringify(request.body.stack || request.body.string || request.body);
      const bulk = JSON.stringify(request.body);
      const date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
      console.re.log(date + " : " + message + " : " + bulk)
      fs.appendFileSync('client.log', date + " : " + message + "\n");
      response.send(JSON.stringify(request.body));
    }
  };
};
