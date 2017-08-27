app.component('topbar', {
  bindings: {
    session: '<'
  },
  templateUrl: "templates/topbar.html",
  controller: function($http, $scope, pluginsService, $rootScope, apiService, reportService, $timeout, langService, stylesService) {
    $scope.templatePath = '/templates/' + $rootScope.template + '/topbar.html';
    $scope.session = this.session
    apiService.hal_availability_check().then(function(data) {
      $scope.halMethod = data && data.method ? data.method : 'get'
    });
    apiService.api_availability_check().then(function(data) {
      $scope.apiMethod = data && data.method ? data.method : 'get'
    });
    $scope.allowedRequest = function() {
      return ($scope.halMethod == 'post' && $scope.apiMethod == 'post') ? 'post' : 'get'
    };
    apiService.getSessionStyle($scope.session, $scope.allowedRequest()).then(function(data) {
      $scope.style = data;
      $scope.customCSS = stylesService.buildClasses(data);
    });

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
