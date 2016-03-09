'use strict';

function DateRangeFilter(lodash, moment) {
    return function(items, range) {
        var filtered = [];

        if(range.type === 'day'){ // filter by day
            lodash.each(items, function(item){
                if(moment(item.createTime).isSame(range.min, 'day')){
                    filtered.push(item);
                }
            });
        }else{ // filter by range of week or month or year
            lodash.each(items, function(item){
                if(moment(item.createTime).isBetween(range.min, range.max, 'day')){
                    filtered.push(item);
                }
            });
        }

        return filtered;
    };
}

export default {
    name: 'DateRangeFilter',
    fn: DateRangeFilter
};