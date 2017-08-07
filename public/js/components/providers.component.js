app.component('providers', {
  bindings: {},
  templateUrl: "templates/providers.html",
  controller: function($scope, $auth, $state, apiService, $stateParams, $window, profileService, reportService, $rootScope) {
    reportService.sendstring('providers component loaded');
    $scope.session = $stateParams.session;
    config.apiUrl = $scope.session.apiUrl ? $scope.session.apiUrl : config.apiUrl;
    config.halUrl = $scope.session.halUrl ? $scope.session.halUrl : config.halUrl;

    apiService.hal_availability_check().then(function(data) {
      $scope.halMethod = data && data.method ? data.method : 'get'
    });
    apiService.api_availability_check().then(function(data) {
      $scope.apiMethod = data && data.method ? data.method : 'get'
    });

    $scope.allowedRequest = function() {
      return ($scope.halMethod == 'post' && $scope.apiMethod == 'post') ? 'post' : 'get'
    };

    try {
      $scope.templatePath = '/templates/' + $rootScope.template + '/providers.html';

      $scope.authenticate = function(provider) {

        var params = {
          params: {
            session: $scope.session
          }
        }
        switch (provider) {
          case 'instagram':
          case 'google':
          case 'vk':
          case 'facebook':
          case 'odnoklassniki':
            this.bySocial(provider, params);
            break;
          case 'voucher':
            params.code = $scope.session.voucher;
            this.byVoucher(params);
            break;
          case 'without':
          case 'password':
            params.code = $scope.session.voucher;
            this.byWithout(params);
            break;
        }
      };

      $scope.bySocial = function(provider, params) {
        try {
          $auth.authenticate(provider, params)
            .then(function(data) {
              if (data === null) {
                $window.location = 'http://enter.gycwifi.com'
              };
              $state.go('main.' + data.data.next_step || 'providers', {
                session: $scope.session
              });
            }, function(e) {
              reportService.sendstring('auth by social: ' + JSON.stringify(e));
            });
        } catch (error) {
          reportService.send(error);
        }
      };

      $scope.byWithout = function(params) {
        try {
          apiService.without(params, $scope.allowedRequest())
            .then(function(data) {
              if (!data) {
                $window.location = 'http://enter.gycwifi.com'
              };
              $state.go('main.' + data.next_step || 'providers', {
                session: $scope.session
              });
            })
            .catch(function(e) {
              reportService.sendstring('auth without social: ' + JSON.stringify(e));
            });
        } catch (error) {
          reportService.send(error);
        }
      };

      $scope.byVoucher = function(params) {
        try {
          apiService.voucher(params)
            .then(function(data) {
              if (!data) {
                $window.location = 'http://enter.gycwifi.com'
              };
              $state.go('main.' + data.next_step || 'providers', {
                session: $scope.session
              });
            })
            .catch(function(e) {
              reportService.sendstring('auth by voucher: ' + JSON.stringify(e));
            });
        } catch (error) {
          reportService.send(error);
        }
      };

      apiService.getSessionStyle($scope.session, $scope.allowedRequest()).then(function(data) {
        $scope.style = data;
        $scope.style.vouchers = data.vouchers
      })

    } catch (error) {
      reportService.send(error)
    }
  }
});
