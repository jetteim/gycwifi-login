app.component('mainView', {
  bindings: {},
  templateUrl: "templates/main-view.html",
  controller: function($scope, $http, profileService, $element, $state, reportService, $stateParams, apiService, langService, $rootScope, pluginsService,
    $timeout) {
    // в index.jade ng-init = "session = '#{session}'", а в index.js в методе контроллера sessionCtrl отдали сессию в $rootScope.session
    // this.$timeout = $timeout;
    // this.pluginsService = pluginsService;
    // var self = this;

    this.init = function() {
      pluginsService.initUi();
      pluginsService.uiAction('sidebar_close')
    };

    this.$onInit = function() {
      $timeout(this.init(), 0)
    }

    this.closeSideBar = function() {
      pluginsService.uiAction('sidebar_close')
    }

    this.toggleSideBar = function() {
      pluginsService.uiAction('sidebar_toggle')
    }

    reportService.sendstring('main view component loaded')
    $rootScope.renderWorks = false
    try {
      $scope.lang = 'ru';
      $scope.session = $rootScope.session;
      config.apiUrl = $scope.session.apiUrl ? $scope.session.apiUrl : config.apiUrl;
      config.halUrl = $scope.session.halUrl ? $scope.session.halUrl : config.halUrl;

      apiService.hal_availability_check().then(function(data) {
        $scope.halMethod = data && data.method ? data.method : 'get'
      });
      apiService.api_availability_check().then(function(data) {
        $scope.apiMethod = data && data.method ? data.method : 'get'
      });

      $scope.allowedRequest = function() {
        return ($scope.halMethod == 'post' && $scope.apiMethod == 'post') ? 'post' : 'get'
      };

      function setAppTemplate(template) {
        reportService.sendstring('trying to apply a template');
        if (!template) return;
        $rootScope.template = template;
        $scope.templatePath = '/templates/' + template + '/main-view.html';
        $scope.mediaPath = '/templates/' + template + '/images';
        reportService.sendstring('template paths set');
        $timeout(pluginsService.initUi(), 0);
      }

      var defaultTemplate = 'default';

      reportService.sendstring('now loading template from location style');

      apiService.getSessionStyle($scope.session, $scope.allowedRequest())
        .then(function(styles) {
          reportService.sendstring('applying session style');
          $scope.style = styles;
          if (styles && styles.background) {
            $element.css(
              'background-image',
              'linear-gradient(rgba(37, 40, 47, .6), rgba(37, 40, 47, 0.8)), url(' +
              styles.background + ')'
            )
          }
          setAppTemplate(styles.template || defaultTemplate);
        })
        .catch(function(e) {
          setAppTemplate(styles.template || defaultTemplate);
          reportService.sendstring(JSON.stringify(e));
        });

      $scope.changeLang = function(lang) {
        langService.setLang(lang);
        $scope.lang = lang;
      };
      $rootScope.renderWorks = true;

      reportService.sendstring('navigating to the next step');

      var next_step = $scope.session ? $scope.session.next_step || 'phone' : 'phone';

      $state.go('main.' + next_step, {
        session: $scope.session
      });
    } catch (error) {
      reportService.send(error);
    }

  }

});
