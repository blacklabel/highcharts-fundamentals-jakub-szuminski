function dateStringToUnix(dateString) {
    return parseInt((new Date(dateString).getTime() / 1000).toFixed(0));
}

function generateData() {
    const startDate = dateStringToUnix('2021.08.10'),
        endDate = dateStringToUnix('2022.05.12'),
        data = [];

    for(let i = startDate; i < endDate; i += 50000) {
        data.push([i, Math.floor(Math.random() * 100)]);
    }

    return data;
}

Highcharts.stockChart('chart-one', {
    series: [{
        name: 'AAPL',
        data: generateData(),
        dataGrouping: {
            groupPixelWidth: 5,
        }
    }]
});

Highcharts.stockChart('chart-two', {
    series: [{
        name: 'AAPL',
        data: generateData(),
    }],

    stockTools: {
        gui: {
            iconsURL: './',
            buttons: ['increaseDataGrouping', 'decreaseDataGrouping'],
            definitions: {
                increaseDataGrouping: {
                    className: 'increase-data-grouping',
                    symbol: 'arrow-up.svg'
                },
                decreaseDataGrouping: {
                    className: 'decrease-data-grouping',
                    symbol: 'arrow-down.svg'
                }
            }
        },
    },

    navigation: {
        bindings: {
            increaseDataGrouping: {
                className: 'increase-data-grouping',
                init: function(e) {
                    console.log(this);
                    console.log(e);

                    console.log('increasing...');

                    const series = this.chart.series[0],
                        groupPixelWidth = series.groupPixelWidth;

                    if(groupPixelWidth >= 30) {
                        alert('Maximum value of DataGrouping achieved');
                    }

                    series.update({
                        dataGrouping: {
                            groupPixelWidth: groupPixelWidth + 2
                        }
                    });
                }
            },
            decreaseDataGrouping: {
                className: 'decrease-data-grouping',
                init: function(e) {
                    console.log('decreasing...');

                    const series = this.chart.series[0],
                        groupPixelWidth = series.groupPixelWidth;

                    if(groupPixelWidth <= 1) {
                        alert('Minimum value of DataGrouping achieved');
                    }

                    series.update({
                        dataGrouping: {
                            groupPixelWidth: groupPixelWidth - 2
                        }
                    });
                }
            }
        }
    }
});