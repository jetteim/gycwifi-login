app.component('banner', {
  bindings: {
    banner: '<'
  },
  templateUrl: "templates/banner.html",
  controller: function($http, $scope, $rootScope, apiService) {
    $scope.templatePath = '/templates/' + $rootScope.template + '/banner.html';
  }
});
