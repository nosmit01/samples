/* global toastr:false, moment:false */
(function() {
  'use strict';

  angular
    .module('samples')
    .constant('toastr', toastr)
    .constant('moment', moment);

})();
