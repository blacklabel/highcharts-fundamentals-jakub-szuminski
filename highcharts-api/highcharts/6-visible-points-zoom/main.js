const generateData = (length) => Array.from({ length }, () => Math.random() * 100);

Highcharts.chart('container', {
    chart: {
        zoomType: 'xy',

        events: {
            load() {
                const chart = this,
                    maxY = chart.yAxis[0].dataMax;
                
                console.log(chart.yAxis[0]);

                for(let point of chart.yAxis[0].series[0].data) {
                    if(point.y !== maxY) continue;

                    chart.renderer.circle(chart.xAxis[0].toPixels(point.x), chart.yAxis[0].toPixels(0), 5)
                    .attr({ zIndex: 5, })
                    .css({ color: 'red' })
                    .add();
                }

                chart.visibleCount = chart.renderer.text(`Visible count: ${chart.yAxis[0].series[0].data.length}`, chart.plotLeft, chart.plotTop + chart.plotHeight + 50).add();
            }, 
            redraw() {
                const chart = this;
                console.log(this);

                let visibleCount = 0;

                const yMin = chart.yAxis[0].min,
                    yMax = chart.yAxis[0].max,
                    xMin = chart.xAxis[0].min,
                    xMax = chart.xAxis[0].max;

                const checkPoint = (point) => (yMin <= point.y && point.y <= yMax && xMin <= point.x && point.x <= xMax);
                
                for(let point of chart.yAxis[0].series[0].data) {
                    if(checkPoint(point)) visibleCount++;
                }

                console.log('Visible count: ', visibleCount);
                if(chart.visibleCount) {
                    chart.visibleCount.attr({
                        text: `Visible count: ${visibleCount}`,
                        x: chart.plotLeft,
                        y: chart.plotTop + chart.plotHeight + 50,
                    })
                } else {
                    chart.visibleCount = chart.renderer.text(`Visible count: ${visibleCount}`, chart.plotLeft, chart.plotTop + chart.plotHeight + 50).add();
                }
            }
        }
    },

    title: {
        text: 'Chart title',
    },

    plotOptions: {
        series: {
            dataLabels: {
                enabled: true,

                style: {
                    color: 'red',
                    textOutline: undefined,
                },

                formatter() {
                    return this.point.y === this.point.series.yAxis.dataMax ? Math.floor(this.point.y) : '';
                }
            }
        }
    },

    series: [{
        name: 'Series 1',
        data: generateData(100),
    }]
});