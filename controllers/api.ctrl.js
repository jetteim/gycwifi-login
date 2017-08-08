'use strict';
module.exports = (httpRequest, querystring, config, stringify) => {
  return {
    receive: (request, response, next) => {
      const appleCNASignature = 'OS X '
      const appleCNAreply =
        '<div class="ng-scope text-center">Для подключения закройте это окно и откройте в Safari ссылку <a id="proceed" href="http://enter.gycwifi.com" class="btn">http://enter.gycwifi.com</a><br>Close this window, run Safari and open this link to connect <a id="proceed" href="http://enter.gycwifi.com" class="btn">http://enter.gycwifi.com</a></div>'
      let routerData = {};
      request.method === 'POST' ? routerData = request.body : routerData = request.query;
      const user_ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
      const clientIsCNA = false; // (routerData.platform_os.search(appleCNASignature) >= 0);

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
          if (clientIsCNA) {
            response.send(appleCNAreply)
          } else {
            response.render('index', {
              session: JSON.stringify(body)
            })
          }
        } else {
          response.send('api error: "' + res.body.status + ' ' + res.body.error + '"');
        }
      });
    },

    connecting: (request, response, next) => {
      const appleCNASignature = 'OS X '
      const appleCNAreply =
        '<div class="ng-scope text-center">Для подключения закройте это окно и откройте в Safari ссылку <a id="proceed" href="http://enter.gycwifi.com" class="btn">http://enter.gycwifi.com</a><br>Close this window, run Safari and open this link to connect <a id="proceed" href="http://enter.gycwifi.com" class="btn">http://enter.gycwifi.com</a></div>'
      let routerData = {};
      request.method === 'POST' ? routerData = request.body : routerData = request.query;
      const user_ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
      const clientIsCNA = false; // (routerData.platform_os.search(appleCNASignature) >= 0);

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
          if (clientIsCNA) {
            response.send(appleCNAreply)
          } else {
            response.render('index', {
              session: JSON.stringify(body)
            })
          }
        } else {
          response.send('api error: "' + res.body.status + ' ' + res.body.error + '"');
        }
      });
      // var routerData = {};
      // console.re.log(`request from router: ${stringify(request)}, ${stringify(response)}`)
      // request.method === 'POST' ? routerData = request.body : routerData = request.query;
      // console.re.log(`parsed data: ${stringify(routerData)}`)
      // routerData.user_ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
      // var dst = `${config.get('loginUrl')}/receive_data_from_router_cna`;
      // var linkbtnRU =
      //   `<a class="btn" id="proceed" href="${dst}?${querystring.stringify(routerData)}">JavaScript отключен! Нажмите на эту ссылку для продолжения</a><br/>`;
      // var linkbtnEN =
      //   `<a class="btn" id="proceed" href="${dst}?${querystring.stringify(routerData)}">JavaScript is turned off! Click this link to proceed</a><br/>`;
      // var script = `<script>setTimeout(function(){document.getElementById("proceed").click();}, 1500);</script>`;
      // var style = `<style>* { display: none;}</style><noscript><style>* { display: initial !important;}</style></noscript>`
      //   // var script = `<script>setTimeout(function(){document.getElementById("proceed").click();}, 5000);</script>`;
      //   // var style = `<style>* { display: initial;}</style><noscript><style>* { display: initial !important;}</style></noscript>`
      // var respondhtml = `<html><head>${style}</head><body><main>${linkbtnRU}${linkbtnEN}${script}</main></body></html>`;
      // response.send(respondhtml);
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
