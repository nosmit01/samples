(function() {
  'use strict';

  angular
    .module('samples')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
