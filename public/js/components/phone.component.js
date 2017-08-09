app.component('phone', {
  bindings: {},
  templateUrl: "templates/phone.html",
  controller: function($scope, $http, $state, reportService, $stateParams, apiService, $rootScope) {
    reportService.sendstring('phone component loaded');
    $scope.templatePath = '/templates/' + $rootScope.template + '/phone.html';
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

    apiService.getSessionStyle($scope.session, $scope.allowedRequest()).then(function(data) {
      reportService.sendstring('applying session style');
      $scope.style = data;
    });

    this.send = function() {
      apiService.sendPendingAuth($scope.session)
        .then(function(data) {
          let next_step = data ? data.next_step : 'phone';
          let state = next_step ? `main.${next_step}` : 'main.phone';
          try {
            $state.go(state, {
              session: data
            });
          } catch (error) {
            reportService.send(error);
          }
        })
        .catch(function(e) {
          reportService.send(JSON.stringify(e));
        });
    };

  }
});
