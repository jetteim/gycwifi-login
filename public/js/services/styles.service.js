  app.factory('stylesService', function() {
    return {
      buildClasses: function(style) {
        return {
          // formPrimaryColor: {
          //   'background-color': style.color_theme.form_primary_color,
          //   'color': style.color_theme.form_primary_text_color
          // },
          // textPrimaryColo: {
          //   'color': style.color_theme.form_primary_text_color
          // },
          // formSecondaryColor: {
          //   'background-color': style.color_theme.form_secondary_color
          // },
          // textSecondaryColor: {
          //   'color': style.color_theme.form_secondary_text_color
          // },
          // formAlternateColor: {
          //   'background-color': style.color_theme.form_alternate_color
          // },
          // textAlternateColor: {
          //   'color': style.color_theme.form_alternate_text_color
          // },
          // linkColor: {
          //   'color': style.color_theme.form_link_color
          // }
        };
      }
    };
  });
