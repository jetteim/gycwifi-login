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

  return {
    query: function(query) {
      return $http.get(config.apiUrl + '/auth/password', query).then(
        function(data) {
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
      return $http(req(config.apiUrl + '/auth/without_social', session, method))
        .then(function(data) {
          return data.data;
        }).catch(function(e) {
          reportService.sendstring(e);
          return null
        });
    },

    voucher: function(session, method = 'get') {
      return $http(req(config.apiUrl + '/auth/voucher', session, method))
        .then(function(data) {
          return data.data;
        }).catch(function(e) {
          reportService.sendstring(e);
          return null
        });
    },

    sendPoll: function(query, method = 'get') {
      return $http(req(config.apiUrl + '/send_poll_results', query, method))
        .then(
          function(data) {
            return data.data;
            // return data.data.next_step ? data.data : null;
          })
        .catch(function(e) {
          reportService.sendstring(e);
          return null
        });
    },

    sendVerifyCode: function(query, method = 'get') {
      return $http(req(config.apiUrl + '/check_verify_code', query, method))
        .then(
          function(data) {
            return data.data;
            // return data.data.next_step ? data.data : null;
          })
        .catch(function(e) {
          reportService.sendstring(e);
          return null
        });
    },

    authorizeClient: function(query, method = 'get') {
      return $http(req(config.halUrl + '/authorize_client', query, method))
        .then(function(data) {
          return data.data;
          // return data.data.next_step ? data.data : null;
        })
        .catch(function(e) {
          reportService.sendstring(e);
          return null
        });
    },

    verifyCode: function(data, method = 'get') {
      return $http(req(config.apiUrl + '/verify_code', data, method))
        .then(function(response) {
          return response.data;
        })
        .catch(function(e) {
          reportService.sendstring(e);
          return null
        });
    },

    getSessionStyle: function(data, method = 'get') {
      return $http(req(config.apiUrl + '/login_session_style', data, method))
        .then(function(response) {
          return response.data;
        })
        .catch(function(e) {
          reportService.sendstring(e);
          return null
          // return e.data;
        })
    },

    getSessionRouter: function(data, method = 'get') {
      return $http(req(config.apiUrl + '/login_session_router', data, method))
        .then(function(response) {
          return response.data;
        })
        .catch(function(e) {
          reportService.sendstring(e);
          return null
          // return e.data;
        })
    },

    getSessionCSS: function(data, method = 'get') {
      return $http(req(config.apiUrl + '/login_session_css', data, method))
        .then(function(response) {
          return response.data;
        })
        .catch(function(e) {
          reportService.sendstring(e);
          return null
          // return e.data;
        })
    },

    getSessionTargeting: function(data, method = 'get') {
      return $http(req(config.apiUrl + '/login_session_targeting', data, method))
        .then(function(response) {
          return response.data;
        })
        .catch(function(e) {
          reportService.sendstring(e);
          return null
          // return e.data;
        })
    },

    getSessionPoll: function(data, method = 'get') {
      return $http(req(config.apiUrl + '/login_session_poll', data, method))
        .then(function(response) {
          return response.data;
        })
        .catch(function(e) {
          reportService.sendstring(e);
          return null
          // return e.data;
        })
    },

    getSessionClient: function(data, method = 'get') {
      return $http(req(config.apiUrl + '/login_session_client', data, method))
        .then(function(response) {
          return response.data;
        })
        .catch(function(e) {
          reportService.sendstring(e);
          return null
          // return e.data;
        })
    },

    sendPendingAuth: function(data, method = 'get') {
      return $http(req(config.apiUrl + '/pending_call_auth', data, method))
        .then(function(response) {
          return response.data;
        })
        .catch(function(e) {
          reportService.sendstring(e);
          return null
          // return e.data;
        })
    },

    verifyPendingAuth: function(data, method = 'get') {
      return $http(req(config.apiUrl + '/check_client_number', data, method))
        .then(function(response) {
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
