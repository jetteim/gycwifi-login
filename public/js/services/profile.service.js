app.factory('profileService', function(cookiesService, reportService) {
  var cookieKey = 'params';

  // Private methods
  var setProfile = function(data) {
    try {
      cookiesService.putData(cookieKey, data);
    } catch (e) {
      reportService.send(e)
    }
  };
  var loadProfile = function() {
    try {
      return cookiesService.getData(cookieKey);
    } catch (e) {
      reportService.send(e)
    }
  };
  var clearProfile = function() {
    cookiesService.del(cookieKey);
  };

  return {
    get: loadProfile,
    clear: clearProfile,
    save: setProfile
  };

});
