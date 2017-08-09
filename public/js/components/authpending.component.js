app.component('authpending', {
  bindings: {},
  templateUrl: "templates/authpending.html",
  controller: function($scope, $rootScope, $state, $stateParams, reportService, apiService) {
    reportService.sendstring('authpending component loaded');
    $scope.templatePath = '/templates/' + $rootScope.template + '/authpending.html';
    $scope.session = $stateParams.session;
    config.apiUrl = $scope.session.apiUrl ? $scope.session.apiUrl : config.apiUrl;
    config.halUrl = $scope.session.halUrl ? $scope.session.halUrl : config.halUrl;

    apiService.hal_availability_check().then(function(data) {
      $scope.halMethod = data && data.method ? data.method : 'get';
    });
    apiService.api_availability_check().then(function(data) {
      $scope.apiMethod = data && data.method ? data.method : 'get';
    });

    $scope.allowedRequest = function() {
      return ($scope.halMethod == 'post' && $scope.apiMethod == 'post') ? 'post' : 'get';
    };

    apiService.getSessionTargeting($scope.session, $scope.allowedRequest()).then(function(data) {
      $scope.banner = data
    });

    reportService.sendstring('pulling session style');

    apiService.getSessionStyle($scope.session, $scope.allowedRequest())
      .then(function(data) {
        $scope.style = data;
        performCheck();
      });

    function performCheck() {
      reportService.sendstring('checking pending authorization');
      if ($scope.session.sms_code) {
        apiService.verifyCode($scope.session, $scope.allowedRequest())
          .then(function(data) {
            let next_step = data ? data.next_step : 'authpending';
            let state = next_step ? `main.${next_step}` : 'main.authpending';
            let phone_number = data ? data.phone_number : null;
            $scope.session.phone_number = phone_number;
            try {
              $state.go(state, {
                session: $scope.session
              });
            } catch (error) {
              reportService.send(error);
            }
          })
          .catch(function(e) {
            reportService.send(JSON.stringify(e));
          });
      } else {
        apiService.verifyPendingAuth($scope.session, $scope.allowedRequest())
          .then(function(data) {
            let next_step = data ? data.next_step : 'authpending';
            let state = next_step ? `main.${next_step}` : 'main.authpending';
            let client_id = data ? data.client_id : null;
            $scope.session.client_id = client_id;
            try {
              $state.go(state, {
                session: $scope.session
              });
            } catch (error) {
              reportService.send(error);
            }
          })
          .catch(function(e) {
            reportService.sendstring(JSON.stringify(e));
          });
      }
    }

    this.checkClientNumber = function() {
      performCheck();
    };

    this.notMyNumber = function() {
      reportService.sendstring('navigating back to phone page');
      $state.go('main.phone', {
        session: $scope.session
      });
    };

  }
});
