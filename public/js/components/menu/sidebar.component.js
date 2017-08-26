app.component('sidebar', {
  bindings: {
    style: '<'
  },
  templateUrl: "templates/sidebar.html",
  controller: function($http, $scope, $rootScope, pluginsService, langService) {
    $scope.templatePath = '/templates/' + $rootScope.template + '/sidebar.html';
    $scope.style = this.style
    $scope.lang = langService.getLang() || 'ru'
    langService.setLang($scope.lang);

    this.closeSideBar = function() {
      pluginsService.uiAction('sidebar_close')
    }

    this.toggleSideBar = function() {
      pluginsService.uiAction('sidebar_toggle')
    }

  }
});
