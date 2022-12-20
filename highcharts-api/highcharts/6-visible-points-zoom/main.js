const generateData = (length) => Array.from({ length }, () => Math.floor(Math.random() * 100));

Highcharts.chart('container', {
    chart: {
        zoomType: 'xy',
        events: {
            render() {
                const chart = this,
                    yAxis = chart.yAxis[0],
                    yMin = yAxis.min,
                    yMax = yAxis.max,
                    xMin = chart.xAxis[0].min,
                    xMax = chart.xAxis[0].max;
                
                let maxVisibleValue = 0,
                    maxPoints = [],
                    visibleCount = 0;
                
                if(chart.maxCircles) chart.maxCircles.forEach(circle => circle.destroy());
                chart.maxCircles = [];

                if(chart.maxLabels) chart.maxLabels.forEach(label => label.destroy());
                chart.maxLabels = [];

                for(let point of yAxis.series[0].data) {
                    if(yMin <= point.y && point.y <= yMax && xMin <= point.x && point.x <= xMax) {
                        visibleCount++;

                        if(point.y > maxVisibleValue) {
                            maxPoints = [];
                            maxVisibleValue = point.y;
                        } 
                        
                        if(point.y === maxVisibleValue) {
                            maxPoints.push(point);
                        } 
                    }
                }

                for(let point of maxPoints) {
                    const circle = chart.renderer.circle(chart.xAxis[0].toPixels(point.x), chart.plotTop + chart.plotHeight, 5)
                        .attr({ zIndex: 5, })
                        .css({ color: 'red' })
                        .add();
                    chart.maxCircles.push(circle);

                    const label = chart.renderer.text(point.y, chart.xAxis[0].toPixels(point.x), chart.yAxis[0].toPixels(point.y) - 10)
                        .attr({ zIndex: 5 })
                        .css({ color: 'red' })
                        .add();
                    chart.maxLabels.push(label);
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
    series: [{
        data: generateData(100)
    }]
});