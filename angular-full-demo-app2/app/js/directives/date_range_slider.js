'use strict';

function dateRangeSlider(moment, lodash) {

    return {
        restrict: 'EA',
        scope: {
            direction: '@'
        },
        link: (scope, element) => {
            $(element).click(function(){

                //console.log($(this).parent().find('h3'));
                //$(this).parent().find('h3').animate({left: '100px'}, "slow");
            })
        }
    }
}

export default {
    name: 'dateRangeSlider',
    fn: dateRangeSlider
};
