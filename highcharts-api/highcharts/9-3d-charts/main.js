let time = 0;

Highcharts.chart('container', {
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
                const chart = this;
                
                const timeInterval = 0.001,
                    angularFrequency = 10;

                const calculatePosition = (start, multiplier, func = Math.sin) => start + multiplier * func(angularFrequency * time);

                setInterval(() => {
                    chart.series[0].data[1].update({
                        x: calculatePosition(5, 2),
                        z: calculatePosition(5, 2, Math.cos)
                    });

                    chart.series[0].data[2].update({
                        x: calculatePosition(5, 1),
                        z: calculatePosition(5, 1, Math.cos),
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
        scatter: {
            width: 10,
            height: 10,
        },
    },

    yAxis: {
        min: 0,
        max: 10,
        title: null,       
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
                x: 5,
                y: 5,
                z: 5,
                marker: {
                    fillColor: 'yellow',
                    radius: 10,
                }
            }, 
            {
                x: 4.5, 
                y: 5,
                z: 5,
                marker: {
                    fillColor: 'blue',
                    radius: 5,
                    symbol: 'circle',
                }
            },
            {
                x: 4.5,
                y: 5,
                z: 6,
                marker: {
                    fillColor: 'yellow',
                    radius: 2,
                    symbol: 'circle',
                }
            }
        ],
    }]
})