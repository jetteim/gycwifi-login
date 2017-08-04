app.factory('$message', function(pluginsService) {
    // Private methods
    function successMessage(msg1, msg2) {
        pluginsService.message(msg1, msg2, 'success');
    }
    function errorMessage(msg1, msg2) {
        pluginsService.message(msg1, msg2, 'error');
    }

    // Public message
    return {
        success: successMessage,
        error: errorMessage
    }
});