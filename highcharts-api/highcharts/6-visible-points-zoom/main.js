const generateData = (length) => Array.from({ length }, () => Math.floor(Math.random() * 100));

Highcharts.chart('container', {
    chart: {
        zoomType: 'xy',
        events: {
            load() {
                const chart = this,
                    yAxis = chart.yAxis[0],
                    maxY = yAxis.dataMax;
                
                chart.maxCircles = [];
                
                for(let point of yAxis.series[0].data) {
                    if(point.y !== maxY) continue;

                    chart.maxCircles.push(
                        [chart.renderer.circle(chart.xAxis[0].toPixels(point.x), yAxis.toPixels(0), 5)
                        .attr({ zIndex: 5, })
                        .css({ color: 'red' })
                        .add(),
                        point.x]
                    );
                }

                chart.visibleCount = chart.renderer.text(
                    `Visible count: ${yAxis.series[0].data.length}`, 
                    chart.plotLeft, 
                    chart.plotTop + chart.plotHeight + 50
                ).add();

                chart.update({
                    plotOptions: {
                        series: {
                            dataLabels: {
                                formatter() {
                                    return this.point.y === maxY ? this.point.y : '';
                                }
                            }
                        }
                    }
                });
            }, 
            redraw() {
                const chart = this,
                    yAxis = chart.yAxis[0];
                
                const yMin = yAxis.min,
                    yMax = yAxis.max,
                    xMin = chart.xAxis[0].min,
                    xMax = chart.xAxis[0].max;
                
                let visibleCount = 0;

                const checkPoint = (point) => (
                    (yMin <= point.y && point.y <= yMax) && (xMin <= point.x && point.x <= xMax)
                );
                
                for(let point of yAxis.series[0].data) {
                    if(checkPoint(point)) visibleCount++;
                }

                for(let circle of chart.maxCircles) {
                    circle[0].attr({
                        x: chart.xAxis[0].toPixels(circle[1])
                    });
                }

                if(chart.visibleCount) {
                    chart.visibleCount.attr({
                        text: `Visible count: ${visibleCount}`,
                        x: chart.plotLeft,
                        y: chart.plotTop + chart.plotHeight + 50,
                    })
                } else {
                    chart.visibleCount = chart.renderer.text(
                        `Visible count: ${visibleCount}`, 
                        chart.plotLeft, 
                        chart.plotTop + chart.plotHeight + 50
                    ).add();
                }
            }
        }
    },

    plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
                style: {
                    color: 'red',
                    textOutline: 'white',
                },
            }
        }
    },

    series: [{
        data: generateData(100)
    }]
});