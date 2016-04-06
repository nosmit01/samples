'use strict';

function Spinner() {
    return {
        restrict: 'EA',
        replace: true,
        scope: {
            show: '='
        },
        template: [
            '<div id="spinner" ng-if="show" class="col-md-12 text-center">',
            '  <div class="loader">Loading...</div>',
            '</div>'
        ].join('')
    };
}

export default {
    name: 'spinner',
    fn: Spinner
};