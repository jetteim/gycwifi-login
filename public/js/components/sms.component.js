app.component('sms', {
  bindings: {},
  templateUrl: "templates/sms.html",
  controller: function($state, profileService, reportService, apiService, $stateParams, $rootScope) {
    $scope.session = $stateParams.session
    config.apiUrl = $scope.session.apiUrl ? $scope.session.apiUrl : config.apiUrl
    config.halUrl = $scope.session.halUrl ? $scope.session.halUrl : config.halUrl
    $scope.templatePath = '/templates/' + $rootScope.template + '/sms.html';

    this.send = function() {
      apiService.sendVerifyCode($scope.session)
        .then(function(data) {
          try {
            $state.go('main.' + data.next_step, {
              session: data
            })
          } catch (error) {
            reportService.send(error);
          }
        })
        .catch(function(e) {
          reportService.send(JSON.stringify(e));
        });
    }
  }
});
