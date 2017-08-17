app.service('pluginsService', function() {

  //Alert Message
  this.message = function(msg1, msg2, type) {
    //swal(msg1, msg2, type); //todo to be or not to be
    console.log('messages plugin is not defined');
  };

  this.initUi = function() {
    // Init base ui scripts
    OneUI.init();
    OneUI.initHelper('slimscroll');
    OneUI.init('uiBlocks');
    OneUI.initHelper('table-tools');
  }

  this.uiAction = function(action) {
    OneUI.layout(action)
  }

});
