app.component('topbar', {
  bindings: {
    session: '<'
  },
  templateUrl: "templates/topbar.html",
  controller: function($http, $scope, pluginsService, $rootScope, apiService, reportService, $timeout, langService) {
    $scope.templatePath = '/templates/' + $rootScope.template + '/topbar.html';
    $scope.lang = $rootScope.lang
    $scope.session = this.session
    $scope.style = $rootScope.style

    $scope.changeLang = function(lang) {
      langService.setLang(lang);
      $scope.lang = lang;
    };

    this.closeSideBar = function() {
      pluginsService.uiAction('sidebar_close')
    }

    this.toggleSideBar = function() {
      pluginsService.uiAction('sidebar_toggle')
    }

    this.init = function() {
      pluginsService.initUi();
      this.closeSideBar();
    };

    this.$onInit = function() {
      $timeout(this.init(), 0)
      langService.setLang($scope.lang)
    }

  }
});
