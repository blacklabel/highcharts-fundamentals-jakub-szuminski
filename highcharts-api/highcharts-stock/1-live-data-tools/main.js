/*
QUICK EXPLANATION:

1. We add a custom property "index" to each chart which enables to write less code later
2. Random data is generated & fills the 0-series in each chart

3. First chart has 2 indicators: LinearRegressionIntercept & DEMA which are linked to the 0-series

4. Both charts have liveDataButton which turnes live data mode on and off
- chart.liveInterval is the interval active on chart (or null if live data is disabled)

5. function addPointsLive simulates a request to the server each 1500 miliseconds and 
returns an interval object which adds a randomly-generated point to the chart

6. Second chart has changeDataGrouping button which consists of 3 button items 
- grouping-dense -> changes groupPixelWidth to small
- group-normal -> changes groupPixelWidth to normal
- group-wide -> changes groupPixelWidth to

*/

const defaultButtons = ['indicators', 'separator', 'simpleShapes', 'lines', 'crookedLines', 'measure', 'advanced', 'toggleAnnotations', 'separator', 'verticalLabels', 'flags', 'separator', 'zoomChange', 'fullScreen', 'typeChange', 'separator', 'currentPriceIndicator', 'saveChart'];

const liveDataButton = {
    className: 'live-data',
    init(e) {
        const chart = this.chart;

        //if "liveData" is turned on (there is an interval) then turn off (clearInterval)
        if(chart.liveInterval) { 
            clearInterval(chart.liveInterval);
            chart.liveInterval = null;
        } 
        //if was turned off, create an interval
        else {
            chart.liveInterval = addPointsLive(chart);
        }

        chart.liveLabel.attr({
            text: `Live data: ${chart.liveInterval ? 'on' : 'off'}`
        });

        deselectButton(this, e);
    },
}

function setDataGrouping(chart, newGroupWidth) {
    chart.series[0].update({
        dataGrouping: {
            groupPixelWidth: newGroupWidth
        }
    });   
}

function deselectButton(context, e) {
    context.selectedButton = null;
    context.selectedButtonElement = null;
    if(e.classList) e.classList.remove('highcharts-active');
}

function generateData() {
    const startDate = Date.UTC(2021, 4, 15) / 1000,
        endDate = Date.UTC(2022, 4, 12) / 1000,
        stepSize = 50000;
        
    return Array.from({ length: (endDate - startDate) / stepSize + 1}, 
    (_, i) => (
        [startDate + i * stepSize, Math.floor(Math.random() * 100)]
    ));
}

function addPointsLive(chart) {
    return setInterval(() => {  
        chart.endDate += 5000;
        const newPoint = [chart.endDate, Math.floor(Math.random() * 100)];
        chart.series[0].addPoint(newPoint, true);
    }, 1500);
}

Highcharts.stockChart('chart-one', {
    chart: {
        events: {
            load() {
                const chart = this;

                chart.liveLabel = chart.renderer
                    .text('Live data: off', chart.plotLeft, chart.plotTop + 18)
                    .attr({ zIndex: 10 })
                    .add();

                chart.index = 0;
                chart.endDate = Date.UTC(2022, 4, 12) / 1000;
                chart.liveInterval = null;
            }
        }
    },
    
    yAxis: [{
        min: 0,
        max: 100,
        height: '75%',

    }, {
        top: '75%',
        height: '25%'
    }],

    series: [{
        name: 'AAPL',
        id: 'main',
        data: generateData(),
        dataGrouping: {
            groupPixelWidth: 15,
        }
    }, {
        type: 'linearRegressionIntercept',
        linkedTo: 'main',
        yAxis: 1,
        marker: {
            enabled: false,
        }
    }, {
        type: 'dema',
        linkedTo: 'main',
        yAxis: 1,
        marker: {
            enabled: false
        },
    }],
    
    stockTools: {
        gui: {
            buttons: ['liveData', ...defaultButtons],

            definitions: {
                liveData: {
                    className: 'live-data',     
                }
            }
        }
    },

    navigation: {
        bindings: {
            liveData: liveDataButton
        }
    }
});

Highcharts.stockChart('chart-two', {
    chart: {
        events: {
            load() {
                const chart = this;

                chart.liveLabel = chart.renderer
                    .text('Live data: off', chart.plotLeft, chart.plotTop + 18)
                    .attr({ zIndex: 10 })
                    .add();

                chart.index = 1;
                chart.endDate = Date.UTC(2022, 4, 12) / 1000;
                chart.liveInterval = null;
            }
        }
    },
    
    series: [{
        name: 'AAPL',
        data: generateData(),
    }],

    stockTools: {
        gui: {
            buttons: ['changeDataGrouping', 'liveData', ...defaultButtons],

            definitions: {
                liveData: {
                    className: 'live-data',
                },
                changeDataGrouping: {
                    items: ['groupingDense', 'groupingNormal', 'groupingWide'],
                    className: 'change-data-grouping',
                    symbol: 'text.svg',
                    
                    groupingDense: {
                        className: 'grouping-dense',
                        symbol: 'arrow-right.svg',
                    },
                    groupingNormal: {
                        className: 'grouping-normal',
                        symbol: 'circle.svg',
                    },
                    groupingWide: {
                        className: 'grouping-wide',
                        symbol: 'arrow-left.svg',
                    }
                }
            }
        },
    },  

    navigation: {
        bindings: {
            liveData: liveDataButton,
            changeDataGrouping: {
                className: 'change-data-grouping',
            },
            groupingDense: {
                className: 'grouping-dense',
                init(e) { 
                    deselectButton(this, e)
                    setDataGrouping(this.chart, 2);
                }
            },
            groupingNormal: {
                className: 'grouping-normal',
                init(e) {
                    deselectButton(this, e);
                    setDataGrouping(this.chart, 5)
                }
            },
            groupingWide: {
                className: 'grouping-wide',
                init(e) {
                    deselectButton(this, e);
                    setDataGrouping(this.chart, 15);
                }
            }
        }
    }
});

