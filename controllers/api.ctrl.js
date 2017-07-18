'use strict';
module.exports = (httpRequest, querystring, config) => {
  return {
    receive: (request, response, next) => {
      let routerData = {};
      request.method === 'POST' ? routerData = request.body : routerData = request.query;
      var user_ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;

      const options = {
        uri: config.get('apiUrl') + '/receive_data_from_router',
        method: 'POST',
        json: routerData
      };

      // const hal_options = {
      //   uri: config.get('halUrl') + '/authorize_client',
      //   method: 'POST',
      //   json: {
      //     timeout: 6,
      //     mac: routerData.mac,
      //     common_name: routerData.nas_cn,
      //     client_ip: routerData.ip
      //   }
      // };
      //
      // httpRequest(hal_options, function(error, res, body) {
      //
      // });
      httpRequest(options, function(error, res, body) {
        if (!error && res.statusCode == 200) {
          body.user_ip = user_ip
          body.apiUrl = config.get('apiUrl')
          body.halUrl = config.get('halUrl')
          response.render('index', {
            session: JSON.stringify(body)
          });
        } else {
          response.send('api error: "' + res.body.status + ' ' + res.body.error + '"');
        }
      });
    },
    connecting: (request, response, next) => {
        let routerData = {};
        request.method === 'POST' ? routerData = request.body : routerData = request.query;
        var user_ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
        const options = {
          uri: config.get('apiUrl') + '/receive_data_from_router',
          method: 'POST',
          json: routerData
        };
        // const hal_options = {
        //   uri: config.get('halUrl') + '/authorize_client',
        //   method: 'POST',
        //   json: {
        //     timeout: 5,
        //     mac: routerData.mac,
        //     common_name: routerData.nas_cn,
        //     client_ip: routerData.ip
        //   }
        // };
        // httpRequest(hal_options, function(error, res, body) {
        //
        // });
        httpRequest(options, function(error, res, body) {
          if (!error && res.statusCode == 200) {
            body.user_ip = user_ip
            body.apiUrl = config.get('apiUrl')
            body.halUrl = config.get('halUrl')
            response.render('index', {
              session: JSON.stringify(body)
            });
          } else {
            response.send('api error: "' + res.body.status + ' ' + res.body.error + '"');
          }
        });
      }
      // connecting: (request, response, next) => {
      //   console.re.log(`Begin auth process, halUrl: ${config.get('halUrl')} apiUrl: ${config.get('apiUrl')}`);
      //   var routerData = request.body;
      //   response.cookie('original_data', JSON.stringify(routerData), {
      //     maxAge: 900000
      //   })
      //
      //   var params = {
      //     timeout: 3,
      //     mac: routerData.mac,
      //     common_name: routerData.nas_cn,
      //     client_ip: routerData.ip
      //   };
      //   var uri = config.get('halUrl') + '/authorize_client'
      //   var options = {
      //     uri: uri,
      //     method: 'POST',
      //     json: params
      //   };
      //   httpRequest(options, function(error, res, body) {
      //     var dst = `${config.get('loginUrl')}/receive_data_from_router_cna`;
      //     var linkbtn =
      //       `<a class="btn" id="proceed" href="${dst}?${querystring.stringify(routerData)}">JavaScript отключен! Нажмите на эту ссылку для продолжения</a>`;
      //     var script =
      //       `<script>setTimeout(function(){document.getElementById("proceed").click();}, 1500);</script>`;
      //     var style = `<style>* { display: none;}</style><noscript><style>* { display: initial !important;}</style></noscript>`
      //     var respondhtml = `<html><head>${style}</head><body><main>${linkbtn}${script}</main></body></html>`;
      //     // var respondhtml =
      //     //   `<html><head><style>* { display: none;}</style></head>
      //     //             <body><main>${linkbtn}${script}</main></body></html>`;
      //     response.send(respondhtml);
      //   });

  };
};
