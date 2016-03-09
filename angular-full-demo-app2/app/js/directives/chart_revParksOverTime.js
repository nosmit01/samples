'use strict';

function ChartRevParksOverTime(moment, lodash) {

    return {
        restrict: 'EA',
        scope: {
            dateRange: '=',
            reservations: '='
        },
        link: (scope, element) => {

            var tickInterval;

            // watch for change in date range and redraw chart
            scope.$watch('reservations', function(newValue, oldValue) {
                if (newValue && newValue !== oldValue) {
                    let chart = $(element).highcharts();
                    chart.series[0].setData(_setData('revs'), false);
                    chart.series[1].setData(_setData('parks'), false);
                    chart.xAxis[0].options.tickInterval = tickInterval;
                    chart.redraw();
                }
            }, true);

            // set data for each date range type
            function _setData(type){
                let data = [], count, format;
                let sort = lodash.sortBy(scope.reservations, function(obj){
                    return obj.reservations_createTime;
                });

                switch (scope.dateRange.type) {
                    case 'day':
                        format = 'h a';
                        tickInterval = 3600 * 1000;
                        count = lodash.countBy(sort, function(obj){
                            return obj.reservations_createTime;
                        });

                        if(type === 'parks'){
                            lodash.each(count, function(c, key){
                                data.push([parseInt(key), c]);
                            });
                        }else{
                            lodash.each(count, function(c, key){
                                let total = 0;
                                lodash.each(sort, function(s){
                                    if(s.reservations_createTime === parseInt(key)){
                                        total = total + (s.reservations_finalPrice/100);
                                    }
                                });

                                data.push([parseInt(key), total]);
                            });
                        }
                        break;
                    case 'week':
                        format = 'MM/DD/YY';
                        tickInterval = 24 * 3600 * 1000;
                        count = lodash.countBy(sort, function(obj){
                            return moment(obj.reservations_createTime).startOf('day').valueOf();
                        });
                        if(type === 'parks'){
                            lodash.each(count, function(c, key){
                                data.push([parseInt(key), c]);
                            });
                        }else{
                            lodash.each(count, function(c, key){
                                let total = 0;
                                lodash.each(sort, function(s){
                                    if(moment(s.reservations_createTime).startOf('day').valueOf() === parseInt(key)){
                                        total = total + (s.reservations_finalPrice/100);
                                    }
                                });

                                data.push([parseInt(key), total]);
                            });
                        }
                        break;
                    case 'month':
                        format = 'Do';
                        tickInterval = 24 * 3600 * 1000;
                        count = lodash.countBy(sort, function(obj){
                            return moment(obj.reservations_createTime).startOf('day').valueOf();
                        });
                        if(type === 'parks'){
                            lodash.each(count, function(c, key){
                                data.push([parseInt(key), c]);
                            });
                        }else{
                            lodash.each(count, function(c, key){
                                let total = 0;
                                lodash.each(sort, function(s){
                                    if(moment(s.reservations_createTime).startOf('day').valueOf() === parseInt(key)){
                                        total = total + (s.reservations_finalPrice/100);
                                    }
                                });

                                data.push([parseInt(key), total]);
                            });
                        }
                        break;
                    case 'year':
                        format = 'MMM';
                        tickInterval = null;
                        count = lodash.countBy(sort, function(obj){
                            return moment(obj.reservations_createTime).startOf('month').valueOf();
                        });
                        if(type === 'parks'){
                            lodash.each(count, function(c, key){
                                data.push([parseInt(key), c]);
                            });
                        }else{
                            lodash.each(count, function(c, key){
                                let total = 0;
                                lodash.each(sort, function(s){
                                    if(moment(s.reservations_createTime).startOf('month').valueOf() === parseInt(key)){
                                        total = total + (s.reservations_finalPrice/100);
                                    }
                                });

                                data.push([parseInt(key), total]);
                            });
                        }
                        break;
                    case 'custom':
                        format = 'h a';
                        tickInterval = 3600 * 1000;
                        count = lodash.countBy(sort, function(obj){
                            return obj.reservations_createTime;
                        });

                        if(type === 'parks'){
                            lodash.each(count, function(c, key){
                                data.push([parseInt(key), c]);
                            });
                        }else{
                            lodash.each(count, function(c, key){
                                let total = 0;
                                lodash.each(sort, function(s){
                                    if(s.reservations_createTime === parseInt(key)){
                                        total = total + (s.reservations_finalPrice/100);
                                    }
                                });

                                data.push([parseInt(key), total]);
                            });
                        }
                        break;
                }

                return data;
            }

            Highcharts.setOptions({
                global: {
                    useUTC: false
                }
            });

            $(element).highcharts({
                credits: { enabled: false },
                title:{
                  text: ''
                },
                xAxis: {
                    type: 'datetime',
                    tickInterval:tickInterval,
                    title: {
                        text: 'Time',
                        style: {
                            color: 'black',
                            fontSize: '20px'
                        }
                    },
                    dateTimeLabelFormats : {
                        millisecond: '%l %P',
                        hour: '%l %P',
                        day: '%m/%d/%y'
                        //week: '%m/%d/%y',
                        //month: '%b',
                        //year: '%Y'
                    }
                },
                tooltip: {
                    //xDateFormat: '%m/%d/%y', //@todo: make dynamic based on type
                    shared: true
                },
                yAxis: [{ // Parks
                    title: {
                        text: 'Parks',
                        style: {
                            color: 'black',
                            fontSize: '20px'
                        }
                    },
                    opposite: true

                }, { // Revenue
                    gridLineWidth: 1,
                    title: {
                        text: 'Revenue',
                        style: {
                            color: '#7cb5ec',
                            fontSize: '20px'
                        }
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }],
                    labels: {
                        format: '${value}',
                        style: {
                            color: '#7cb5ec'
                        }
                    }
                }],
                legend: {
                    layout: 'vertical',
                    align: 'left',
                    verticalAlign: 'top',
                    borderWidth: 0,
                    floating: true
                },
                series: [{
                    name: 'Revenue',
                    data: _setData('revs'),
                    tooltip: {
                        pointFormat: "Revenue: ${point.y:.2f}, "
                    },
                    yAxis: 1
                }, {
                    name: 'Parks',
                    data: _setData('parks'),
                    tooltip: {
                        pointFormat: "Parks: {point.y}"
                    }
                }]
            });
        }
    };
}

export default {
    name: 'chartRevParksOverTime',
    fn: ChartRevParksOverTime
};
