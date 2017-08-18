app.component('sidebar', {
  bindings: {
    session: '<'
  },
  templateUrl: "templates/sidebar.html",
  controller: function($http, $scope, $rootScope, pluginsService) {
    $scope.templatePath = '/templates/' + $rootScope.template + '/sidebar.html';
    $scope.session = this.session
    $scope.lang = $rootScope.lang
    $scope.style = $rootScope.style

    this.closeSideBar = function() {
      pluginsService.uiAction('sidebar_close')
    }

    this.toggleSideBar = function() {
      pluginsService.uiAction('sidebar_toggle')
    }

  }
});
