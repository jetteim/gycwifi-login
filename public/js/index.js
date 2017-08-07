var app = angular.module('app', ['ui.router', 'pascalprecht.translate', 'satellizer', 'ngCookies']);

var config = {};
// config.apiUrl = 'https://api.gycwifi.com';
// config.halUrl = 'https://hal.gycwifi.com';

app.config(function($stateProvider, $urlRouterProvider, $translateProvider, $authProvider) {

  $urlRouterProvider.otherwise("/");

  $stateProvider

    // Abstract main view
    .state('main', {
      url: "",
      template: '<main-view class="main-view"></main-view>',
      controller: 'sessionCtrl'
    })

    // First step - auth
    .state('main.providers', {
      url: "/providers",
      template: '<providers></providers>',
      params: {
        session: null
      }
    })

    // Second step - phone number
    .state('main.phone', {
      url: "/phone",
      template: '<phone></phone>',
      params: {
        session: null
      }
    })

    .state('main.authpending', {
      url: "/authpending",
      template: '<authpending></authpending>',
      params: {
        session: null
      }
    })

    // Third step - sms input
    .state('main.sms', {
      url: "/sms",
      template: '<sms></sms>',
      params: {
        session: null
      }
    })

    // Fourth step - inter on internet
    .state('main.internet', {
      url: "/internet",
      template: '<internet></internet>',
      params: {
        session: null
      }
    });

  // Providers
  $authProvider.httpInterceptor = function() {
    return true;
  };
  // console.re.log(`starting login angular app, halUrl: ${config.halUrl} apiUrl: ${config.apiUrl}`)
  getUrlConfig = function() {
    return {
      apiUrl: 'https://api.gycwifi.com',
      halUrl: 'https://hal.gycwifi.com'
    }
  }
  var config = config ? config : getUrlConfig()
  $authProvider.withCredentials = false;
  $authProvider.tokenRoot = null;
  $authProvider.baseUrl = '/';
  $authProvider.loginUrl = config.apiUrl + '/auth/password';
  $authProvider.signupUrl = '/auth/signup';
  $authProvider.unlinkUrl = '/auth/unlink/';
  $authProvider.tokenName = 'token';
  $authProvider.tokenPrefix = 'satellizer';
  $authProvider.tokenHeader = 'Authorization';
  $authProvider.tokenType = '';
  $authProvider.storageType = 'cookies';

  // Twitter (Work in progress)
  $authProvider.twitter({
    url: config.apiUrl + '/auth/twitter',
    authorizationEndpoint: 'https://api.twitter.com/oauth/authenticate',
    redirectUri: window.location.origin,
    oauthType: '1.0',
    popupOptions: {
      width: 495,
      height: 645
    }
  });

  // VK
  $authProvider.oauth2({
    name: 'vk',
    url: config.apiUrl + '/auth/vk',
    clientId: '5535231',
    redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
    authorizationEndpoint: 'https://oauth.vk.com/authorize',
    requiredUrlParams: ['display', 'scope'],
    scope: ['audio', 'friends', 'offline'],
    scopeDelimiter: ',',
    display: 'popup',
    type: '2.0',
    popupOptions: {
      width: 580,
      height: 400
    }
  });

  $authProvider.facebook({
    name: 'facebook',
    url: config.apiUrl + '/auth/facebook',
    clientId: '1744031425861866',
    redirectUri: window.location.origin + '/',
    authorizationEndpoint: 'https://www.facebook.com/v2.8/dialog/oauth',
    requiredUrlParams: ['display', 'scope'],
    scope: ['public_profile', 'email', 'user_hometown', 'user_birthday'],
    scopeDelimiter: ',',
    display: 'popup',
    type: '2.0',
    popupOptions: {
      width: 580,
      height: 400
    }
  });

  // Instagram
  $authProvider.instagram({
    url: config.apiUrl + '/auth/instagram',
    clientId: 'aa1fba4378b24fae8a3c6ae777e59a0f',
    redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host
  });

  // Google
  $authProvider.google({
    url: config.apiUrl + '/auth/google_oauth2',
    redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
    requiredUrlParams: ['scope'],
    optionalUrlParams: ['display'],
    scope: ['profile', 'email'],
    scopePrefix: 'openid',
    scopeDelimiter: ' ',
    display: 'popup',
    oauthType: '2.0',
    popupOptions: {
      width: 452,
      height: 633
    },
    clientId: '356689716495-gd4ovrvbr019u7tr2blutmc4q91ot7v3.apps.googleusercontent.com'
  });

  // Languages
  $translateProvider.useStaticFilesLoader({
    prefix: '/locales/',
    suffix: '.json'
  });
  var language = 'ru';
  //var language = localStorage.getItem('lang') || 'ru';
  $translateProvider.preferredLanguage(language);
  $translateProvider.useSanitizeValueStrategy('escape');

});

app.controller('sessionCtrl', function($scope, $rootScope, reportService) {
  reportService.sendstring('parsing session from Jade')
  $rootScope.session = JSON.parse($scope.session);
  reportService.sendstring('logi session: ' + $rootScope.session)
  config.apiUrl = $scope.session.apiUrl;
  config.halUrl = $scope.session.apiUrl
});

app.run(function(bFeaturesService, $http, $sce, reportService) {
  bFeaturesService.check();
  $http.get('/get_api_url').then(function(response) {
    config.apiUrl = response.data;
  });
  $http.get('/get_hal_url').then(function(response) {
    config.halUrl = response.data;
  });
});
