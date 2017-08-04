module.exports = function(app, ENV, HttpError, ExpressErrorHandler) {

    app.use(function(err, req, res, next) {
        if (typeof err == 'number') {
            err = new HttpError(err);
        }

        if (err instanceof HttpError) {
            res.sendHttpError(err);
        } else {
            if (ENV != 'production') {
                ExpressErrorHandler()(err, req, res, next);
            } else {
                err = new HttpError(500);
                res.sendHttpError(err);
            }
        }

    });

};