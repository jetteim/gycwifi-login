app.factory('cookiesService', function($cookies) {
    // Private methods
    function getCookies(key) {
        var data = $cookies.get(key);
        if (!data) return null;
        return JSON.parse(data.replace(/^j:/, ''));
    }
    function _getParams() {
        return getCookies('params')
    }
    function getData() {
        return _getParams();
    }
    function putData(key, data) {
        return $cookies.put(key, JSON.stringify(data));
    }

    // Public message
    return {
        getData: getData,
        putData: putData
    }
});
