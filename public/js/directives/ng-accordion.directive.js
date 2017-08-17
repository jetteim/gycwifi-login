/* @ngInject */
export default () => {
    return {
        restrict: 'A',
        scope: {},
        link: function(scope, element, attr) {
            $('.panel-heading').on('click', function(e) {
                if ($(this).attr('data-toggle') !== 'collapse') {
                    $(this).attr('data-toggle', 'collapse');
                    $(this).parent().parent().find('.collapse').collapse('hide');
                } else {
                    $(this).parent().parent().find('.collapse').collapse('show');
                    $(this).attr('data-toggle', '');
                }
            });
        }
    }
}