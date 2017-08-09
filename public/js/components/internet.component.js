app.component('internet', {
  bindings: {},
  templateUrl: "templates/internet.html",
  controller: function($http, apiService, profileService, $window, $scope, $stateParams, $rootScope, reportService) {
    reportService.sendstring('internet component loaded');
    //TODO: получать параметры баннера от API
    $scope.banner = {
      adDivId: "smt-130299538",
      publisherId: 1100021743,
      adSpaceId: 130299538,
      format: "all",
      formatstrict: true,
      dimension: "xlarge",
      width: 300,
      height: 50,
      sync: false
    }
    $scope.templatePath = '/templates/' + $rootScope.template + '/internet.html';
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

    reportService.sendstring(`authorize_client using ${$scope.allowedRequest()}`);
    apiService.authorizeClient($scope.session, $scope.allowedRequest());

    apiService.getSessionPoll($scope.session, $scope.allowedRequest()).then(function(data) {
      $scope.poll = data;
      if (data) {
        $scope.poll.client_id = $scope.session.client_id;
      }
    });

    apiService.getSessionStyle($scope.session, $scope.allowedRequest()).then(function(data) {
      $scope.style = data;
    });

    this.goToInternet = function() {
      $scope.$broadcast('sendPoll', _redirect);
    };

    function _redirect(res) {
      if (res) {
        if (res.error) {
          reportService.sendstring(res.error);
        }
      }
      $window.location = $scope.session.url;
    }
  }
});
