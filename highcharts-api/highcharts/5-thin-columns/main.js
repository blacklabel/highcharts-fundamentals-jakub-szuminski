const generateData = (length) => Array.from({ length }, 
    () => Math.random() * 35 + 65)

Highcharts.chart('container', {
    chart: {
        type: 'column',
    },
    
    title: {
        text: '',
    },

    xAxis: {
        categories: ['BANK 1', 'BANK 2', 'BANK 3', 'BANK 4', 'BANK 5']
    },

    yAxis: {
        title: {
            text: '',
        }
    },

    legend: {
        enabled: false,
    },

    plotOptions: {
        column: {
            borderRadius: 0,
            borderWidth: 0,
        },

        series: {
            color: 'red',
            pointPadding: 0,
        },
    },

    series: Array.from({ length: 100 }, () => ({ data: generateData(5) }))
});