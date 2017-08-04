  app.factory('internetService', function($http) {
  return {
    send: function(query) {
      return $http.post(query.url, query);
    }
  };
});
