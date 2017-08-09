app.component('banner', {
  bindings: {
    session: '<'
  },
  templateUrl: "templates/banner.html",
  controller: function($http, $scope, $rootScope, apiService, reportService) {
    $scope.templatePath = '/templates/' + $rootScope.template + '/banner.html';
    apiService.getSessionTargeting(this.session, 'get').then(function(data) {
      this.callBackForSmaato = function(status) {
        reportService.sendstring(`SomaJS.loadAd() result: ${status}`)
      };
      SomaJS.loadAd(data, this.callBackForSmaato);
    });

  }
});
