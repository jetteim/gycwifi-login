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
    SomaJS.loadAd(this.banner, this.callBackForSmaato);
  }
});
