app.component('banner', {
  bindings: {
    banner: '<'
  },
  templateUrl: "templates/banner.html",
  controller: function($http, $scope, $rootScope, apiService) {
    this.callBackForSmaato = function(status) {
      if (status == "SUCCESS") {
        console.log("callBack is being called with status : " + status);
      } else if (status == "ERROR") {
        console.log("callBack is being called with status : " + status);
      }
    };
    $scope.templatePath = '/templates/' + $rootScope.template + '/banner.html';
    SomaJS.loadAd(banner, this.callBackForSmaato);
  }
});
