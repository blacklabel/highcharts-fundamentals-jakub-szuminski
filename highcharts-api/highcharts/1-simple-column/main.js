const getRandomData = (length) => Array.from({ length }, () => Math.floor(Math.random() * 10));

Highcharts.chart('container', {
    chart: {
        type: 'column',

        events: {
            load() {
                const chart = this,
                    maxY = chart.yAxis[0].dataMax;

                chart.yAxis[0].update({
                    max: maxY * 2,
                    plotLines: [{
                        color: 'green',
                        value: 1.5 * maxY,
                        dashStyle: 'dash',
                        width: 2
                    }]
                });
            }
        }
    },

    title: {
        text: ''
    },

    yAxis: {
        title: {
            text: ''
        }
    },

    xAxis: {
        categories: ['Jan', ' Feb', 'Mar']
    },
	
    plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
                formatter() {
                    return this.point.y === this.point.series.yAxis.dataMax ? 'max' : '';
                }
            }
        }
    },
	
    series: [{
        name: 'Tokyo',
        data: getRandomData(3)
    }, {
        name: 'New York',
        data: getRandomData(3)
    }, {
        name: 'London',
        data: getRandomData(3)
    }]

});
