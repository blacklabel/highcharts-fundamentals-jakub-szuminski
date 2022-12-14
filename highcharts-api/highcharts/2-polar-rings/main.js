const getRandomData = (length) => Array.from({ length }, () => Math.floor(Math.random() * 10));

const chart = Highcharts.chart('container', {
    chart: {
        polar: true,

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
                        }, {
                        	color: 'red',
                            value: 1.75 * maxY,
                            width: 1.5
                        }]
                    });
            },

            render() {
                const chart = this;

                if(chart.circle) {
                    chart.circle.attr({
                        x: chart.chartWidth / 2,
                        y: chart.plotHeight / 2 + chart.plotTop
                    });
                } else {
                    chart.circle = chart.renderer.circle(chart.chartWidth / 2, chart.chartHeight / 2 - 20, chart.plotHeight * 0.4).attr({
                        fill: 'transparent',
                        stroke: 'dodgerblue',
                        'stroke-width': 2
                    }).add();    
                }
            },
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
		type: 'column',
        name: 'Tokyo',
        data: getRandomData(3)
    }, {
		type: 'column',
        name: 'New York',
        data: getRandomData(3)
    }, {
		type: 'column',
        name: 'London',
        data: getRandomData(3)
    }]

});

