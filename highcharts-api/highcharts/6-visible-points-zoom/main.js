const generateData = (length) => Array.from({ length }, () => Math.floor(Math.random() * 100));

Highcharts.chart('container', {
    chart: {
        zoomType: 'xy',
        events: {
            render() {
                console.log('render event triggered');

                const chart = this,
                    yAxis = chart.yAxis[0],
                    maxY = yAxis.dataMax,
                    yMin = yAxis.min,
                    yMax = yAxis.max,
                    xMin = chart.xAxis[0].min,
                    xMax = chart.xAxis[0].max;
                
                let maxVisibleValue = -Infinity,
                    visibleCount = 0;
                
                for(let point of yAxis.series[0].data) {
                    if(yMin <= point.y && point.y <= yMax && xMin <= point.x && point.x <= xMax) {
                        visibleCount++;
                        maxVisibleValue = Math.max(maxVisibleValue, point.y);
                    }
                }
                chart.maxVisibleValue = maxVisibleValue;

                if(chart.maxCircles) chart.maxCircles.forEach(circle => circle.destroy());
                chart.maxCircles = [];

                for(let point of yAxis.series[0].data) {
                    if(point.y !== maxVisibleValue) continue;

                    const circle = chart.renderer.circle(chart.xAxis[0].toPixels(point.x), chart.plotTop + chart.plotHeight, 5)
                        .attr({ zIndex: 5, })
                        .css({ color: 'red' })
                        .add();
                    chart.maxCircles.push(circle);
                }

                if(!chart.visibilityInfoText) chart.visibilityInfoText = chart.renderer.text().add();
                chart.visibilityInfoText.attr({
                    text: `Visible count: ${visibleCount}`,
                    x: chart.plotLeft,
                    y: chart.plotTop + chart.plotHeight + 50
                });
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
                formatter() {
                    return this.point.y === this.series.chart.maxVisibleValue ? this.point.y : '';
                }
            },
        }
    },
    series: [{
        data: generateData(100)
    }]
});