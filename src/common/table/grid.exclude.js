var swGrid = function (options) {
   var defaultOptions = {
      showSelectionCheckbox: false,
      showDetailView: false,
      columnDef: [],
      data: []
   };
   this.config = $.extend({}, defaultOptions, options);
};

swGrid.prototype = {
   constructor: swGrid,

   init: function () {
   }
};
