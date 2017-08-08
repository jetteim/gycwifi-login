app.component('standard-banner-ad', {
  bindings: {},
  templateUrl: "templates/standard-banner-ad.html",
  controller: function($http, $scope, $rootScope, apiService) {
    $scope.templatePath = '/templates/' + $rootScope.template + '/standard-banner-ad.html';
    this.adRequest = {
      adDivId: "smt-130299538",
      publisherId: 1100021743,
      adSpaceId: 130299538,
      format: "all",
      formatstrict: true,
      dimension: "xxlarge",
      width: 320,
      height: 50,
      sync: false,
    };

  }
});
