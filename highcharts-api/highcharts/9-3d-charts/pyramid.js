Highcharts.chart('pyramid-container', {
    chart: {
        options3d: {
            enabled: true,
            alpha: 8
        },
    },

    title: {
        text: 'Highcharts Funnel/Pyramid3D Chart'
    },

    series: [{
        type: 'funnel3d',
        data: [15654, 4064, 1987, 976, 846],
        neckWidth: '25%',
        neckHeight: '100%',
        height: 150,
    }, {
        type: 'pyramid3d',
        data: [15654, 4064, 1987, 976, 846],
        height: 150,
        width: 400,
        center: ['50%', '35']
    }]
})