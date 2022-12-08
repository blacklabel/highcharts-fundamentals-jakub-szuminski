Highcharts.chart('container', {
    chart: {
        type: 'bar',
        marginTop: 50,
        
        events: {
        	load() {
            	const chart = this;

                //Rendering additional texts
                chart.renderer.text('Issue', 65, 35).add();
                chart.renderer.text('Record count', chart.plotLeft + 15, 35).add();
                
                chart.actionsText = chart.renderer.text('Actions', chart.plotWidth, 35).add();
                
                //Rendering 'How to fix buttons'
                const axisHeight = chart.xAxis[0].toPixels(1) - chart.xAxis[0].toPixels(0);
                
                chart.buttons = Array.from({ length: chart.yAxis[0].series.length }, () => 0);
                chart.yAxis[0].series.forEach((_, ind) => {
                    chart.buttons[ind] = chart.renderer.button('How to fix', chart.plotWidth, chart.plotTop + axisHeight * (ind * 4 + 1) / 4,
                        () => console.log('Button clicked!')).add();
                });

                //Creating space for buttons
                chart.yAxis[0].update({
                	max: chart.yAxis[0].dataMax * 1.75
                });

                //Calculating sums for each category in xAxis 
                let sumTable = Array.from({ length: chart.yAxis[0].series.length }, () => 0);
                chart.yAxis[0].series.forEach(serie => {
                    serie.yData.forEach((value, index) => sumTable[index] += value);
                });
     
                //Adding dataLabels based on sumTable
     			chart.xAxis[0].series[0].data.forEach((serie, index) => serie.update({
                	dataLabels: [{
                    	inside: 'false',
                        align: 'right',
                        x: 50,
                        format: `${Math.floor(sumTable[index] / 1000)} K`
                    }]
                }));
     		},
            
            render() {
            	const chart = this;

                const axisHeight = chart.xAxis[0].toPixels(1) - chart.xAxis[0].toPixels(0);

                if(chart.actionsText) {
                    chart.actionsText.attr({
                        x: chart.plotWidth
                    });
                }
                
                chart.yAxis[0].series.forEach((_, ind) => {
                    if(chart.buttons[ind]) {
                        chart.buttons[ind].attr({
                            x: chart.plotWidth,
                            y: chart.plotTop + axisHeight * (ind * 4 + 1) / 4
                        });
                    }
                });
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
        
        gridLineWidth: 0,
    },
    
    legend: {
    	enabled: false,
    },
    
    plotOptions: {
        series: {
            stacking: 'normal',
            dataLabels: {
                enabled: 'true',
                formatter() {
                    return typeof this === 'object' ? '' : this;
                }
            }
        },
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