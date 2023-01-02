let time = 0;

function generateGradient(color) {
    return {
        radialGradient: { cx: 0.4, cy: 0.3, r: 0.5 },
        stops: [
            [0, color], 
            [1, Highcharts.color(color).brighten(-0.5).get('rgb')]
        ],
    }
}

Highcharts.chart('solar-container', {
    chart: {
        margin: 100,
        type: 'scatter3d',
        animation: false,

        options3d: {
            enabled: true,
            alpha: 10,
            beta: 45,
            depth: 250,
            viewDistance: 5,
            fitToPlot: false,
            frame: {
                bottom: { size: 1, color: 'black', },
                back: { size: 1, color: 'black', },
                side: { size: 1, color: 'black', }
            }
        },

        events: {
            load() {
                const chart = this,
                    timeInterval = 0.001,
                    calculatePosition = (start, multiplier, func = Math.sin, angularFrequency = 10) => (
                        start + multiplier * func(angularFrequency * time)
                    );

                setInterval(() => {
                    chart.series[0].data[1].update({
                        x: calculatePosition(5, 2.5),
                        z: calculatePosition(5, 2.5, Math.cos)
                    });

                    chart.series[0].data[2].update({
                        x: calculatePosition(chart.series[0].data[1].x, 0.5, Math.sin, 25),
                        z: calculatePosition(chart.series[0].data[1].z, 0.5, Math.cos, 25),
                    })

                    time += timeInterval;
                }, timeInterval);
            }
        }
    },

    title: {
        text: 'Solar System',
    },

    plotOptions: {
        series: {     
            width: 10,
            height: 10,
            planeProjection: {
                enabled: true,
                byPoint: true
            }
        }
    },

    yAxis: {
        min: 0,
        max: 10,
        title: {
            text: ''
        },       
    },

    xAxis: {
        min: 0,
        max: 10,
        gridLineWidth: 1,
    },

    zAxis: {
        min: 0,
        max: 10,
        showFirstLabel: false,
    },

    legend: {
        enabled: false,
    },

    series: [{
        name: 'Solar System',
        data: [
            {
                name: 'Sun',
                x: 5, y: 5, z: 5,
                color: '#d6cf4b',
                marker: {
                    fillColor: generateGradient('#d6cf4b'),
                    radius: 15,
                    symbol: 'circle'
                },
            }, 
            {
                name: 'Earth',
                x: 4.5, y: 5, z: 5,
                color: '#7caff7',
                marker: {
                    fillColor: generateGradient('#7caff7'),
                    radius: 7,
                    symbol: 'circle'
                }
            },
            {
                name: 'Moon',
                x: 4.5, y: 5, z: 6,
                color: '#ff9cfa',
                marker: {
                    fillColor: generateGradient('#ff9cfa'),
                    radius: 4,
                    symbol: 'circle'
                }
            }
        ],
    }]
})