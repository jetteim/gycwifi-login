app.component('video-banner-ad', {
  bindings: {},
  templateUrl: "templates/video-banner-ad.html",
  controller: function($http, $scope, $rootScope, apiService) {
    $scope.templatePath = '/templates/' + $rootScope.template + '/video-banner-ad.html';
    this.targeting = {
      adDivId: "smt-130299540",
      publisherId: 1100021743,
      adSpaceId: 130299540,
      format: "video",
      formatstrict: true,
      dimension: "large",
      width: 216,
      height: 36,
      sync: false,
    };
  }

});
