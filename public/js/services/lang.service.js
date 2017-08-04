app.factory('langService', function($translate) {
    function saveLang(lang) {
        try {
            localStorage.setItem('lang', lang);
        } catch (e) {
            console.error("Local Storage is not available");
        }
    }
    function readLang() {
        try {
            return localStorage.getItem('lang');
        } catch (e) {
            console.error("Local Storage is not available");
        }
    }
    return {
        setLang: function(lang) {
            $translate.use(lang);
            saveLang(lang);
        },
        getLang: function() {
            return readLang();
        }
    };
});