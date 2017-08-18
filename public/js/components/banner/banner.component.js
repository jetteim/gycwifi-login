app.component('banner', {
  bindings: {
    session: '<'
  },
  templateUrl: "templates/banner.html",
  controller: function($http, $scope, $rootScope, apiService, reportService, $timeout) {
    $scope.templatePath = '/templates/' + $rootScope.template + '/banner.html';
    var self = this;
    apiService.getSessionTargeting(this.session, 'get').then(function(data) {
      self.banner = data;
      this.callBackForSmaato = function(status) {
        reportService.sendstring(`SomaJS.loadAd() result: ${status}`)
      };
      $timeout(SomaJS.loadAd(data, this.callBackForSmaato), 1);
    });

  }
});
