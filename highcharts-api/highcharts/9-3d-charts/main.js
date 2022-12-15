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
                console.log(this);

                const timeInterval = 0.001;

                const angularFrequency = 10;
                const calculateX = () => 5 + Math.sin(angularFrequency * time);
                const calculateZ = () => 5 + Math.cos(angularFrequency * time);

                setInterval(() => {
                    chart.series[1].update({
                        data: [[calculateX(), 5, calculateZ()]]
                    });

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
        name: 'Sun',
        data: [[5, 5, 5]],
        marker: {
            fillColor: 'yellow',
            radius: 10,
        }
    }, {
        name: 'Earth',
        data: [[4.5, 5, 5]],
        marker: {
            fillColor: 'red',
            radius: 5,
            symbol: 'circle'
        }
    }]
})