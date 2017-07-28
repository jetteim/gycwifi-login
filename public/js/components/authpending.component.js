app.component('authpending', {
  bindings: {},
  templateUrl: "templates/authpending.html",
  controller: function($scope, $rootScope, $state, $stateParams, reportService, apiService) {
    $scope.templatePath = '/templates/' + $rootScope.template + '/authpending.html';
    $scope.session = $stateParams.session
    config.apiUrl = $scope.session.apiUrl ? $scope.session.apiUrl : config.apiUrl
    config.halUrl = $scope.session.halUrl ? $scope.session.halUrl : config.halUrl

    apiService.hal_availability_check().then(function(data) {
      $scope.halMethod = data && data.method ? data.method : 'get'
    });
    apiService.api_availability_check().then(function(data) {
      $scope.apiMethod = data && data.method ? data.method : 'get'
    });

    $scope.allowedRequest = function() {
      return ($scope.halMethod == 'post' && $scope.apiMethod == 'post') ? 'post' : 'get'
    };


    apiService.getSessionStyle($scope.session, $scope.allowedRequest())
      .then(function(data) {
        $scope.style = data;
        performCheck();
      });

    function performCheck() {
      if ($scope.session.sms_code) {
        apiService.verifyCode($scope.session, $scope.allowedRequest())
          .then(function(data) {
            try {
              $state.go(data.next_step ? `main.${data.next_step}` : 'main.authpending', {
                session: data.phone_number ? data : $scope.session
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
            try {
              $state.go(data.next_step ? `main.${data.next_step}` : 'main.authpending', {
                session: data.client_id ? data : $scope.session
              });
            } catch (error) {
              reportService.send(error);
            }
          })
          .catch(function(e) {
            reportService.send(JSON.stringify(e));
          });
      }
    }

    this.checkClientNumber = function() {
      performCheck();
    };

    this.notMyNumber = function() {
      $state.go('main.phone', {
        session: $scope.session
      });
    };

  }
});
