app.factory('bFeaturesService', function(reportService) {
    const modernizr = Modernizr;
    const featuresForCheck = [
        'cookies',
        'localstorage',
        'promises',
        'sessionstorage'
    ];

    function getMessage() {
        var message = '';
        featuresForCheck.forEach(function(feature) {
            if (!modernizr[feature]) {
                message += feature + ' is not supported! ';
            }
        });
        return message;
    }

    function send(message) {
        if (!message) return;
        reportService.sendstring('Browser support error: ' + message);
    }

    return {
        check: function() {
            send(getMessage());
        },
        detectPlatform: function() {
            var userAgent = navigator.userAgent || navigator.vendor || window.opera;
            // Windows Phone must come first because its UA also contains "Android"
            if (/windows phone/i.test(userAgent)) {
                return "Windows Phone";
            }
            if (/android/i.test(userAgent)) {
                return "Android";
            }
            // iOS detection from: http://stackoverflow.com/a/9039885/177710
            if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
                return "iOS";
            }
            return "unknown";
        }
    }
});