export default () => {
    return {
        link: function (scope, element) {
            var table      = jQuery(element);
            var tableRows  = jQuery('.js-table-sections-header > tr', table);
            tableRows.on('click', function(e) {
                var row    = jQuery(this);
                var tbody  = row.parent('tbody');

                if (! tbody.hasClass('open')) {
                    jQuery('tbody', table).removeClass('open');
                }
                tbody.toggleClass('open');
            });
        }
    };
}
