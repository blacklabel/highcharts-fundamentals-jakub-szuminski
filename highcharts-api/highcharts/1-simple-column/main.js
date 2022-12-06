const generateRandomNumber = () => Math.floor(Math.random() * 10);
const generateRandomTriplet = () => Array.from({ length: 3 }, generateRandomNumber);

Highcharts.chart('container', {
    chart: {
        type: 'column',

        events: {
            load() {
                const chart = this;
                const maxY = chart.yAxis[0].dataMax;

                chart.yAxis[0].update({
                    max: maxY * 2,
                    plotLines: [{
                        color: 'green',
                        value: 1.5 * maxY,
                        dashStyle: 'dash',
                        width: 2
                    }]
                });

                chart.update({
                    plotOptions: {
                        series: {
                            dataLabels: {
                                enabled: true,
                                formatter() {

                                    return this.point.y === maxY ? 'max' : '';
                                }
                            }
                        }
                    }
                })
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

    series: [{
        name: 'Tokyo',
        data: generateRandomTriplet()
    }, {
        name: 'New York',
        data: generateRandomTriplet()
    }, {
        name: 'London',
        data: generateRandomTriplet()
    }]

});
