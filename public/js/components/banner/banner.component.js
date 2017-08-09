app.component('banner', {
  bindings: {
    banner: '<'
  },
  templateUrl: "templates/banner.html",
  controller: function($http, $scope, $rootScope, apiService, reportService) {
    $scope.templatePath = '/templates/' + $rootScope.template + '/banner.html';
    this.callBackForSmaato = function(status) {
      reportService.sendstring(`SomaJS.loadAd() result: ${status}`)
    };
    apiService.getSessionTargeting(banner, 'get').then(function(data) {
      SomaJS.loadAd(data, this.callBackForSmaato);
    });

  }
});
