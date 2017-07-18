app.factory('reportService', function($http) {
  return {
    sendstring: function(s) {
      $http.post('/error_report', {
          string: s
        })
        .then(function(data) {
          console.log(data.data)
        })
    },
    send: function(e) {
      var error = {
        name: e.name,
        message: e.message,
        stack: e.stack
      };
      $http.post('/error_report', error)
        .then(function(data) {
          console.log(data.data)
        })
    }
  }
});
