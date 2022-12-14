Highcharts.chart('container', {
    chart: {
        type: 'bar',
        marginTop: 50,
        
        events: {
        	load() {
            	const chart = this,
                    axisHeight = chart.xAxis[0].toPixels(1) - chart.xAxis[0].toPixels(0);

                //Rendering additional texts
                chart.renderer.text('Issue', 65, 35).add();
                chart.renderer.text('Record count', chart.plotLeft + 15, 35).add();
                
                chart.actionsText = chart.renderer.text('Actions', chart.plotWidth, 35).add();
                
                //Rendering 'How to fix buttons'
                chart.buttons = [];
                chart.yAxis[0].series.forEach((_, ind) => {
                    chart.buttons.push(chart.renderer.button('How to fix', chart.plotWidth, chart.plotTop + axisHeight * (ind * 4 + 1) / 4,
                        () => console.log('Button clicked!'), { stroke: 'blue', 'stroke-width': 2 }).add());
                });

                //Creating space for buttons
                chart.yAxis[0].update({
                	max: chart.yAxis[0].dataMax * 1.75
                });
     		},
            
            render() {
            	const chart = this,
                    axisHeight = chart.xAxis[0].toPixels(1) - chart.xAxis[0].toPixels(0);

                chart.actionsText.attr({
                    x: chart.plotWidth
                });
                
                chart.buttons.forEach((button, ind) => button.attr({ 
                    x: chart.plotWidth,
                    y: chart.plotTop + axisHeight * (ind * 4 + 1) / 4
                }));
            }
        }
    },
    
    title: {
        text: ''
    },
    
    xAxis: {
        categories: ['Data', 'Emails', 'Duplicates', 'Support'],
        
        tickWidth: 1,
        tickLength: 100,
        tickColor: 'gray',
        gridLineColor: 'gray',
        gridLineWidth: 1,
        
        lineWidth: 0,
        lineColor: 'transparent'
    },
    
    yAxis: {
        title: {
            text: ''
        },
        
        labels: {
        	formatter() {
            	return this.value / 1000;
            }
        },

        stackLabels: {
            enabled: true,
            formatter() {
                return Math.floor(this.total / 1000) + ' K';
            }
        },
        
        gridLineWidth: 0,
    },
    
    
    plotOptions: {
        series: {
            stacking: 'normal',
        },
    },

    legend: {
        enabled: false
    },

    series: [{
        name: 'Tokyo',
        data: [4000, 4590, 6580, 15000],
    }, {
        name: 'Warsaw',
        data: [5325, 3421, 12321, 6321]
    }, {
        name: 'Budapest',
        data: [5555, 1555, 8900, 5321]
    }, {
    	name: 'London',
        data: [3355, 15321, 8321, 9321]
    }]
});