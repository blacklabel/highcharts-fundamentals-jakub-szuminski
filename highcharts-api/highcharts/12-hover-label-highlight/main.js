const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const generateRandomData = (length = 12) => 
    Array.from({ length }, () => Math.floor(Math.random() * 10));

Highcharts.chart('container', {
    chart: {
        type: 'column',
    },
    xAxis: {
        categories: months,
        labels: {
            rotation: -45,
        }
    },
    plotOptions: {
        series: {
            point: {
                events: {
                    mouseOver(e) {
                        const xAxis = this.series.xAxis;
                        xAxis.ticks[e.target.x].label.css({
                            color: 'red',
                            fontSize: 15,
                            fontWeight: 700
                        });
                    }, 
                    mouseOut(e) {
                        const xAxis = this.series.xAxis;
                        xAxis.ticks[e.target.x].label.css({
                            color: 'rgba(102, 102, 102)',
                            fontSize: 11,
                            fontWeight: 400
                        });
                    }
                }
            }
        }
    },
    series: [{
        name: 'Tokyo',
        data: generateRandomData()
    }, {
        name: 'New York',
        data: generateRandomData()
    }, {
        name: 'London',
        data: generateRandomData()
    }, {
        name: 'Berlin',
        data: generateRandomData()
    }]
});
