const fs = require('fs');
const httpRequest = require('request');
const querystring = require('querystring');
const config = require('../config');
// Controllers
const apiCtrl = require('../controllers/api.ctrl')(httpRequest, querystring, config);
const testCtrl = require('../controllers/test.ctrl')(httpRequest);
const errorCtrl = require('../controllers/error.ctrl')(fs);
const homeCtrl = require('../controllers/home.ctrl')();

module.exports = function(app, config, querystring) {

  app.get('/', homeCtrl.index);
  app.post('/error_report', errorCtrl.clientReport);

  app.route('/receive_data_from_router_cna')
    .get(apiCtrl.receive)
    .post(apiCtrl.receive);

  app.route('/connecting')
    .post(apiCtrl.connecting)
    .get(apiCtrl.connecting);

  app.get('/test', testCtrl.index);

  app.get('/get_api_url', (request, response) => {
    response.send(config.get('apiUrl'));
  });

  app.get('/get_hal_url', (request, response) => {
    response.send(config.get('halUrl'));
  });

  // Set 404 Error
  app.use(require('../utils/404'));
};
