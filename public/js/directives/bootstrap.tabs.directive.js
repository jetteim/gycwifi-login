export default () => {
    return {
        link: function (scope, element) {
            jQuery('a', element).on('click', function (e) {
                e.preventDefault();
                jQuery(this).tab('show');
            });
        }
    };
}
