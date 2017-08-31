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
    url: window.location.origin + '/auth/twitter?target=client',
    redirectUri: window.location.origin,
    clientId: '745965151480913920'
  });

  // VK
  $authProvider.oauth2({
    name: 'vk',
    url: config.apiUrl + '/auth/vk?target=client',
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
    url: config.apiUrl + '/auth/facebook?target=client',
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
    url: config.apiUrl + '/auth/instagram?target=client',
    clientId: 'aa1fba4378b24fae8a3c6ae777e59a0f',
    redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host
  });

  // Google
  $authProvider.google({
    url: config.apiUrl + '/auth/google_oauth2?target=client',
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
  reportService.sendstring('parsing session from Jade: ' + $scope.session)
  $rootScope.session = JSON.parse($scope.session);
  config.apiUrl = $scope.session.apiUrl;
  config.halUrl = $scope.session.apiUrl
});

app.factory('uiHelpers', function() {
  return {
    // Handles active color theme
    uiHandleColorTheme: function(themeName) {
      var colorTheme = jQuery('#css-theme');

      if (themeName) {
        if (colorTheme.length && (colorTheme.prop('href') !== 'assets/css/themes/' + themeName + '.min.css')) {
          jQuery('#css-theme').prop('href', 'assets/css/themes/' + themeName + '.min.css');
        } else if (!colorTheme.length) {
          jQuery('#css-main').after('<link rel="stylesheet" id="css-theme" href="assets/css/themes/' + themeName + '.min.css">');
        }
      } else {
        if (colorTheme.length) {
          colorTheme.remove();
        }
      }
    },
    // Handles #main-container height resize to push footer to the bottom of the page
    uiHandleMain: function() {
      var lMain = jQuery('#main-container');
      var hWindow = jQuery(window).height();
      var hHeader = jQuery('#header-navbar').outerHeight();
      var hFooter = jQuery('#page-footer').outerHeight();

      if (jQuery('#page-container').hasClass('header-navbar-fixed')) {
        lMain.css('min-height', hWindow - hFooter);
      } else {
        lMain.css('min-height', hWindow - (hHeader + hFooter));
      }
    },
    // Handles transparent header functionality (solid on scroll - used in frontend pages)
    uiHandleHeader: function() {
      var lPage = jQuery('#page-container');

      if (lPage.hasClass('header-navbar-fixed') && lPage.hasClass('header-navbar-transparent')) {
        jQuery(window).on('scroll', function() {
          if (jQuery(this).scrollTop() > 20) {
            lPage.addClass('header-navbar-scroll');
          } else {
            lPage.removeClass('header-navbar-scroll');
          }
        });
      }
    },
    // Handles sidebar and side overlay custom scrolling functionality
    uiHandleScroll: function(mode) {
      var windowW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      var lPage = jQuery('#page-container');
      var lSidebar = jQuery('#sidebar');
      var lSidebarScroll = jQuery('#sidebar-scroll');
      var lSideOverlay = jQuery('#side-overlay');
      var lSideOverlayScroll = jQuery('#side-overlay-scroll');

      // Init scrolling
      if (mode === 'init') {
        // Init scrolling only if required the first time
        uiHandleScroll();
      } else {
        // If screen width is greater than 991 pixels and .side-scroll is added to #page-container
        if (windowW > 991 && lPage.hasClass('side-scroll') && (lSidebar.length || lSideOverlay.length)) {
          // If sidebar exists
          if (lSidebar.length) {
            // Turn sidebar's scroll lock off (slimScroll will take care of it)
            jQuery(lSidebar).scrollLock('disable');

            // If sidebar scrolling does not exist init it..
            if (lSidebarScroll.length && (!lSidebarScroll.parent('.slimScrollDiv').length)) {
              lSidebarScroll.slimScroll({
                height: lSidebar.outerHeight(),
                color: '#fff',
                size: '5px',
                opacity: .35,
                wheelStep: 15,
                distance: '2px',
                railVisible: false,
                railOpacity: 1
              });
            } else { // ..else resize scrolling height
              lSidebarScroll
                .add(lSidebarScroll.parent())
                .css('height', lSidebar.outerHeight());
            }
          }

          // If side overlay exists
          if (lSideOverlay.length) {
            // Turn side overlay's scroll lock off (slimScroll will take care of it)
            jQuery(lSideOverlay).scrollLock('disable');

            // If side overlay scrolling does not exist init it..
            if (lSideOverlayScroll.length && (!lSideOverlayScroll.parent('.slimScrollDiv').length)) {
              lSideOverlayScroll.slimScroll({
                height: lSideOverlay.outerHeight(),
                color: '#000',
                size: '5px',
                opacity: .35,
                wheelStep: 15,
                distance: '2px',
                railVisible: false,
                railOpacity: 1
              });
            } else { // ..else resize scrolling height
              lSideOverlayScroll
                .add(lSideOverlayScroll.parent())
                .css('height', lSideOverlay.outerHeight());
            }
          }
        } else {
          // If sidebar exists
          if (lSidebar.length) {
            // If sidebar scrolling exists destroy it..
            if (lSidebarScroll.length && lSidebarScroll.parent('.slimScrollDiv').length) {
              lSidebarScroll
                .slimScroll({
                  destroy: true
                });
              lSidebarScroll
                .attr('style', '');
            }

            // Turn sidebars's scroll lock on
            jQuery(lSidebar).scrollLock('enable');
          }

          // If side overlay exists
          if (lSideOverlay.length) {
            // If side overlay scrolling exists destroy it..
            if (lSideOverlayScroll.length && lSideOverlayScroll.parent('.slimScrollDiv').length) {
              lSideOverlayScroll
                .slimScroll({
                  destroy: true
                });
              lSideOverlayScroll
                .attr('style', '');
            }

            // Turn side overlay's scroll lock on
            jQuery(lSideOverlay).scrollLock('enable');
          }
        }
      }
    },
    // Handles page loader functionality
    uiLoader: function(mode) {
      var lBody = jQuery('body');
      var lpageLoader = jQuery('#page-loader');

      if (mode === 'show') {
        if (lpageLoader.length) {
          lpageLoader.fadeIn(250);
        } else {
          lBody.prepend('<div id="page-loader"></div>');
        }
      } else if (mode === 'hide') {
        if (lpageLoader.length) {
          lpageLoader.fadeOut(250);
        }
      }
    },
    // Handles blocks API functionality
    uiBlocks: function(block, mode, button) {
      // Set default icons for fullscreen and content toggle buttons
      var iconFullscreen = 'si si-size-fullscreen';
      var iconFullscreenActive = 'si si-size-actual';
      var iconContent = 'si si-arrow-up';
      var iconContentActive = 'si si-arrow-down';

      if (mode === 'init') {
        // Auto add the default toggle icons
        switch (button.data('action')) {
          case 'fullscreen_toggle':
            button.html('<i class="' + (button.closest('.block').hasClass('block-opt-fullscreen') ? iconFullscreenActive : iconFullscreen) + '"></i>');
            break;
          case 'content_toggle':
            button.html('<i class="' + (button.closest('.block').hasClass('block-opt-hidden') ? iconContentActive : iconContent) + '"></i>');
            break;
          default:
            return false;
        }
      } else {
        // Get block element
        var elBlock = (block instanceof jQuery) ? block : jQuery(block);

        // If element exists, procceed with blocks functionality
        if (elBlock.length) {
          // Get block option buttons if exist (need them to update their icons)
          var btnFullscreen = jQuery('[data-js-block-option][data-action="fullscreen_toggle"]', elBlock);
          var btnToggle = jQuery('[data-js-block-option][data-action="content_toggle"]', elBlock);

          // Mode selection
          switch (mode) {
            case 'fullscreen_toggle':
              elBlock.toggleClass('block-opt-fullscreen');

              // Enable/disable scroll lock to block
              if (elBlock.hasClass('block-opt-fullscreen')) {
                jQuery(elBlock).scrollLock('enable');
              } else {
                jQuery(elBlock).scrollLock('disable');
              }

              // Update block option icon
              if (btnFullscreen.length) {
                if (elBlock.hasClass('block-opt-fullscreen')) {
                  jQuery('i', btnFullscreen)
                    .removeClass(iconFullscreen)
                    .addClass(iconFullscreenActive);
                } else {
                  jQuery('i', btnFullscreen)
                    .removeClass(iconFullscreenActive)
                    .addClass(iconFullscreen);
                }
              }
              break;
            case 'fullscreen_on':
              elBlock.addClass('block-opt-fullscreen');

              // Enable scroll lock to block
              jQuery(elBlock).scrollLock('enable');

              // Update block option icon
              if (btnFullscreen.length) {
                jQuery('i', btnFullscreen)
                  .removeClass(iconFullscreen)
                  .addClass(iconFullscreenActive);
              }
              break;
            case 'fullscreen_off':
              elBlock.removeClass('block-opt-fullscreen');

              // Disable scroll lock to block
              jQuery(elBlock).scrollLock('disable');

              // Update block option icon
              if (btnFullscreen.length) {
                jQuery('i', btnFullscreen)
                  .removeClass(iconFullscreenActive)
                  .addClass(iconFullscreen);
              }
              break;
            case 'content_toggle':
              elBlock.toggleClass('block-opt-hidden');

              // Update block option icon
              if (btnToggle.length) {
                if (elBlock.hasClass('block-opt-hidden')) {
                  jQuery('i', btnToggle)
                    .removeClass(iconContent)
                    .addClass(iconContentActive);
                } else {
                  jQuery('i', btnToggle)
                    .removeClass(iconContentActive)
                    .addClass(iconContent);
                }
              }
              break;
            case 'content_hide':
              elBlock.addClass('block-opt-hidden');

              // Update block option icon
              if (btnToggle.length) {
                jQuery('i', btnToggle)
                  .removeClass(iconContent)
                  .addClass(iconContentActive);
              }
              break;
            case 'content_show':
              elBlock.removeClass('block-opt-hidden');

              // Update block option icon
              if (btnToggle.length) {
                jQuery('i', btnToggle)
                  .removeClass(iconContentActive)
                  .addClass(iconContent);
              }
              break;
            case 'refresh_toggle':
              elBlock.toggleClass('block-opt-refresh');

              // Return block to normal state if the demostration mode is on in the refresh option button - data-action-mode="demo"
              if (jQuery('[data-js-block-option][data-action="refresh_toggle"][data-action-mode="demo"]', elBlock).length) {
                setTimeout(function() {
                  elBlock.removeClass('block-opt-refresh');
                }, 2000);
              }
              break;
            case 'state_loading':
              elBlock.addClass('block-opt-refresh');
              break;
            case 'state_normal':
              elBlock.removeClass('block-opt-refresh');
              break;
            case 'close':
              elBlock.hide();
              break;
            case 'open':
              elBlock.show();
              break;
            default:
              return false;
          }
        }
      }
    }
  };
});

app.controller('HeaderCtrl', ['$scope', '$window',
  function($scope, $window) {
    // When view content is loaded
    $scope.$on('$includeContentLoaded', function() {
      // Transparent header functionality
      $scope.helpers.uiHandleHeader();
    });
  }
]);

app.controller('SidebarCtrl', ['$scope', '$window', '$location',
  function($scope, $localStorage, $window, $location) {
    // When view content is loaded
    $scope.$on('$includeContentLoaded', function() {
      // Handle Scrolling
      $scope.helpers.uiHandleScroll();

      // Get current path to use it for adding active classes to our submenus
      $scope.path = $location.path();
    });
  }
]);

app.run(function(bFeaturesService, $http, $sce, reportService, pluginsService) {
  bFeaturesService.check();
  pluginsService.initUi();
  $http.get('/get_api_url').then(function(response) {
    config.apiUrl = response.data;
  });
  $http.get('/get_hal_url').then(function(response) {
    config.halUrl = response.data;
  });
});
