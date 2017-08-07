// Auth part
app.factory('apiService', function($http, reportService) {
  function req(url, data, method = 'get') {
    return {
      method: method,
      url: url,
      params: method == 'get' ? data : null,
      data: method == 'post' ? data : null
    }
  }

  function enterMethod(method) {
    return reportService.sendstring(`API service enter method ${method}`);
  }

  function exitMethod(method) {
    return reportService.sendstring(`API service exit method ${method}`);
  }

  return {
    query: function(query) {
      enterMethod('query');
      return $http.get(config.apiUrl + '/auth/password', query).then(
        function(data) {
          exitMethod(`query, returining ${data.data}`)
          return data.data;
        }).catch(function(e) {
        reportService.sendstring(e);
      });
    },

    hal_availability_check: function() {
      return $http.post(config.halUrl + '/availability_check')
        .then(function(data) {
          reportService.sendstring('на halUrl прошёл POST, проверяем apiUrl');
          return data.data
        }).catch(function(e) {
          reportService.sendstring('на halUrl не прошёл POST, используем get');
          return false
        });
    },

    api_availability_check: function() {
      return $http.post(config.apiUrl + '/availability_check')
        .then(function(data) {
          reportService.sendstring('на apiUrl тоже прошёл POST, попробуем его использовать');
          return true;
        }).catch(function(e) {
          reportService.sendstring('на apiUrl не прошёл POST, используем get');
          return false
        });
    },

    without: function(session, method = 'get') {
      enterMethod('without')
      return $http(req(config.apiUrl + '/auth/without_social', session, method))
        .then(function(data) {
          exitMethod(`without, returining ${data.data}`)
          return data.data;
        }).catch(function(e) {
          reportService.sendstring(e);
          return null
        });
    },

    voucher: function(session, method = 'get') {
      enterMethod('voucher');
      return $http(req(config.apiUrl + '/auth/voucher', session, method))
        .then(function(data) {
          exitMethod(`voucher, returining ${data.data}`)
          return data.data;
        }).catch(function(e) {
          reportService.sendstring(e);
          return null
        });
    },

    sendPoll: function(query, method = 'get') {
      enterMethod('sendPoll');
      return $http(req(config.apiUrl + '/send_poll_results', query, method))
        .then(
          function(data) {
            exitMethod(`sendPoll, returining ${data.data}`)
            return data.data;
            // return data.data.next_step ? data.data : null;
          })
        .catch(function(e) {
          reportService.sendstring(e);
          return null
        });
    },

    sendVerifyCode: function(query, method = 'get') {
      enterMethod('sendVerifyCode');
      return $http(req(config.apiUrl + '/check_verify_code', query, method))
        .then(
          function(data) {
            exitMethod(`sendVerifyCode, returining ${data.data}`)
            return data.data;
            // return data.data.next_step ? data.data : null;
          })
        .catch(function(e) {
          reportService.sendstring(e);
          return null
        });
    },

    authorizeClient: function(query, method = 'get') {
      enterMethod('authorizeClient');
      return $http(req(config.halUrl + '/authorize_client', query, method))
        .then(function(data) {
          exitMethod(`authorizeClient, returining ${data.data}`)
          return data.data;
          // return data.data.next_step ? data.data : null;
        })
        .catch(function(e) {
          reportService.sendstring(e);
          return null
        });
    },

    verifyCode: function(data, method = 'get') {
      enterMethod('verifyCode');
      return $http(req(config.apiUrl + '/verify_code', data, method))
        .then(function(response) {
          exitMethod(`verifyCode, returining ${response.data}`)
          return response.data;
        })
        .catch(function(e) {
          reportService.sendstring(e);
          return null
        });
    },

    getSessionStyle: function(data, method = 'get') {
      enterMethod('getSessionStyle');
      return $http(req(config.apiUrl + '/login_session_style', data, method))
        .then(function(response) {
          exitMethod(`getSessionStyle, returining ${response.data}`)
          return response.data;
        })
        .catch(function(e) {
          reportService.sendstring(e);
          return null
          // return e.data;
        })
    },

    getSessionRouter: function(data, method = 'get') {
      enterMethod('getSessionRouter');
      return $http(req(config.apiUrl + '/login_session_router', data, method))
        .then(function(response) {
          exitMethod(`getSessionRouter, returining ${response.data}`)
          return response.data;
        })
        .catch(function(e) {
          reportService.sendstring(e);
          return null
          // return e.data;
        })
    },

    getSessionCSS: function(data, method = 'get') {
      enterMethod('getSessionCSS');
      return $http(req(config.apiUrl + '/login_session_css', data, method))
        .then(function(response) {
          exitMethod(`getSessionCSS, returining ${response.data}`)
          return response.data;
        })
        .catch(function(e) {
          reportService.sendstring(e);
          return null
          // return e.data;
        })
    },

    getSessionTargeting: function(data, method = 'get') {
      enterMethod('getSessionTargeting');
      return $http(req(config.apiUrl + '/login_session_targeting', data, method))
        .then(function(response) {
          exitMethod(`getSessionTargeting, returining ${response.data}`)
          return response.data;
        })
        .catch(function(e) {
          reportService.sendstring(e);
          return null
          // return e.data;
        })
    },

    getSessionPoll: function(data, method = 'get') {
      enterMethod('getSessionPoll');
      return $http(req(config.apiUrl + '/login_session_poll', data, method))
        .then(function(response) {
          exitMethod(`getSessionPoll, returining ${response.data}`)
          return response.data;
        })
        .catch(function(e) {
          reportService.sendstring(e);
          return null
          // return e.data;
        })
    },

    getSessionClient: function(data, method = 'get') {
      enterMethod('getSessionClient');
      return $http(req(config.apiUrl + '/login_session_client', data, method))
        .then(function(response) {
          exitMethod(`getSessionClient, returining ${response.data}`)
          return response.data;
        })
        .catch(function(e) {
          reportService.sendstring(e);
          return null
          // return e.data;
        })
    },

    sendPendingAuth: function(data, method = 'get') {
      enterMethod('sendPendingAuth');
      return $http(req(config.apiUrl + '/pending_call_auth', data, method))
        .then(function(response) {
          exitMethod(`sendPendingAuth, returining ${response.data}`)
          return response.data;
        })
        .catch(function(e) {
          reportService.sendstring(e);
          return null
          // return e.data;
        })
    },

    verifyPendingAuth: function(data, method = 'get') {
      enterMethod('verifyPendingAuth');
      return $http(req(config.apiUrl + '/check_client_number', data, method))
        .then(function(response) {
          exitMethod(`verifyPendingAuth, returining ${response.data}`)
          return response.data;
        })
        .catch(function(e) {
          reportService.sendstring(e);
          return null
          // return e.data;
        })
    }
  };
});
