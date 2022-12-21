Highcharts.chart('container', {
    chart: {
        events: {
            load() {
                const chart = this,
                    occurence = {};

                chart.series[0].points.forEach(point => {
                    if(occurence[point.y]) {
                        occurence[point.y]++;
                    } else {
                        occurence[point.y] = 1;
                    }
                });

                chart.occurence = occurence;
            }
        }
    },
    
    yAxis: [{
        max: 12, 
    }, {
        opposite: true
    }],
    xAxis: [{
        pointStart: 1,
        opposite: true
    }, {
        minTickInterval: 5      
    }],

    plotOptions: {
        series: {
            states: {
                inactive: {
                    enabled: false
                }
            },
        }
    },

    series: [{
        type: 'scatter',
        data: [3, 4, 5, 3, 2, 3, 2, 3, 4, 5, 3, 6, 3, 2, 4, 5, 5, 6, 6, 1, 6, 6, 2, 1, 3, 5, 6],
        xAxis: 1,
        zIndex: 1,
        color: '#434348',
        allowPointSelect: true,
    }, {
        type: 'histogram',
        baseSeries: 0,
        yAxis: 1,
        zIndex: -1,
        color: '#7cb4eb',
        events: {
            click(e) {
                const chart = this.chart;
                chart.series[0].data.forEach(dataPoint => {
                    dataPoint.update({
                        selected: chart.occurence[dataPoint.y] === e.point.y
                    })
                });
            }
        }
    }]
});