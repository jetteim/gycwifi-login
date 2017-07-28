app.component('internet', {
  bindings: {},
  templateUrl: "templates/internet.html",
  controller: function($http, apiService, profileService, $window, $scope, $stateParams, $rootScope, reportService) {
    $scope.templatePath = '/templates/' + $rootScope.template + '/internet.html';
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


    apiService.getSessionPoll($scope.session, $scope.allowedRequest()).then(function(data) {
      $scope.poll = data;
      if (data) {
        $scope.poll.client_id = $scope.session.client_id
      }
    });

    apiService.getSessionStyle($scope.session, $scope.allowedRequest()).then(function(data) {
      $scope.style = data;
    });

    try {
      function _redirect(res) {
        if (res) {
          if (res.error) {
            reportService.sendstring(res.error)
          }
        }
        $window.location = $scope.session.url;
      }
      this.goToInternet = function() {
        reportService.sendstring(`authorize_client using ${$scope.allowedRequest()}`);
        apiService.authorizeClient($scope.session, $scope.allowedRequest())
          .then(function(res) {
            reportService.sendstring(
              "authorization on router succeeded, proceed with poll results"
            );
            $scope.$broadcast('sendPoll', _redirect);
          }, function(err) {
            reportService.sendstring(
              "authorization on router failed, proceed with poll results anyway " +
              err.error);
            $scope.$broadcast('sendPoll', _redirect);
          });
      };
    } catch (error) {
      reportService.send(error)
    }
  }
});
