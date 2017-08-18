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
      $timeout(self.load_ad, 500);
    });

    this.callBackForSmaato = function(status) {
      reportService.sendstring(`SomaJS.loadAd() result: ${status}`)
    };

    this.load_ad = function() {
      SomaJS.loadAd(self.banner, self.callBackForSmaato)
    }

  }
});
