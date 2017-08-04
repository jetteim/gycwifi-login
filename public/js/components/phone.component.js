app.component('phone', {
  bindings: {},
  templateUrl: "templates/phone.html",
  controller: function ($scope, $http, $state, reportService, $stateParams, apiService, $rootScope) {
    $scope.templatePath = '/templates/' + $rootScope.template + '/phone.html';
    $scope.session = $stateParams.session
    config.apiUrl = $scope.session.apiUrl ? $scope.session.apiUrl : config.apiUrl
    config.halUrl = $scope.session.halUrl ? $scope.session.halUrl : config.halUrl

    apiService.hal_availability_check().then(function (data) {
      $scope.halMethod = data && data.method ? data.method : 'get'
    });
    apiService.api_availability_check().then(function (data) {
      $scope.apiMethod = data && data.method ? data.method : 'get'
    });

    $scope.allowedRequest = function () {
      return ($scope.halMethod == 'post' && $scope.apiMethod == 'post') ? 'post' : 'get'
    };



    apiService.getSessionStyle($scope.session, $scope.allowedRequest()).then(function (data) {
      $scope.style = data;
    });

    this.send = function () {
      apiService.sendPendingAuth($scope.session)
        .then(function (data) {
          try {
            $state.go('main.' + data.next_step, {
              session: data
            });
          } catch (error) {
            reportService.send(error);
          }
        })
        .catch(function (e) {
          reportService.send(JSON.stringify(e));
        });
    };

  }
});