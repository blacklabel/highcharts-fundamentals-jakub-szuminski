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

    console.log(data);
    return data;
}

Highcharts.stockChart('chart-one', {
    series: [{
        name: 'AAPL',
        data: generateData(),
        tooltip: {
            valueDecimals: 2
        }
    }]
});

Highcharts.stockChart('chart-two', {
    series: [{
        name: 'AAPL',
        data: generateData(),
        tooltip: {
            valueDecimals: 2
        }
    }]
});
