app.component('topbar', {
  bindings: {
    session: '<'
  },
  templateUrl: "templates/topbar.html",
  controller: function($http, $scope, pluginsService, $rootScope, apiService, reportService, $timeout, langService, stylesService) {
    $scope.templatePath = '/templates/' + $rootScope.template + '/topbar.html';
    $scope.session = this.session
    $scope.style = $rootScope.style
    $scope.customCSS = stylesService.buildClasses(styles);
    $scope.lang = $rootScope.lang || $scope.session.lang || langService.getLang() || 'ru'
    langService.setLang($scope.lang);

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
    }

  }
});
