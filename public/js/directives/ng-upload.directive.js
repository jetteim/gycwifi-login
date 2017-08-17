/* @ngInject */
export default (uploadService, eventsService, $message, pluginsService) => {
    return {
        restrict: 'A',
        scope: {},
        link: function(scope, element, attr) {
            var imgEntity = attr.ngUpload;
            if (!imgEntity) return;

            element[0].addEventListener('change', fileLoad, false);

            function fileLoad(evt) {
                // init event start load image
                eventsService.image(imgEntity).loadStart();

                var file = evt.target.files[0]; // File selected
                // Only process image files.
                if (!file.type.match('image.*')) {
                    eventsService.image(imgEntity).loadError();
                    return;
                }

                var reader = new FileReader();
                // reader.readAsBinaryString(file);
                reader.readAsDataURL(file);

                // Closure to capture the file information.
                reader.onload = (function(theFile) {
                    return function(e) {
                        var queryObj = {
                            entity: imgEntity,
                            file_code: e.target.result
                        };
                        // upload img
                        uploadService.uploadImg(queryObj).then(function(imgObj) {
                            if (!imgObj.url) {
                                eventsService.image(imgEntity).loadError();
                                // $message.error('Oops!', imgObj.error);
                                pluginsService.message('Error', imgObj.error, 'error');
                                // pluginsService.message('Error', e.data.error, 'error');
                                return;
                            }
                            // init event image was loaded
                            eventsService.image(imgEntity).loadEnd(imgObj.url);
                        }).catch(function(err) {
                            // init event load error
                            eventsService.image(imgEntity).loadError();
                            // $message.error('Oops..', 'Server error, sorry!');
                            pluginsService.message('Error', imgObj.error, 'error');
                            // pluginsService.message('Error', e.data.error, 'error');
                        });
                    };

                })(file);
            }
        }
    }
}