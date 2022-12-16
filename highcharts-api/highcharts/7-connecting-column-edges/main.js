const generateRandomData = (length) => Array.from({ length }, () => Math.random() * 14);

Highcharts.chart('container', {
    chart: {
        type: 'column',

        events: {
            render() {
                const chart = this;

                let zIndex = 3;
                
                chart.series.foreach(data => {
                    let prevCorner = null;
                    let lineIndex = 0;
                    zIndex++;

                    if(!data.lines) data.lines = [];

                    data.forEach(point => {
                        const x = chart.plotLeft + point.shapeArgs.x,
                            y = chart.plotTop + point.shapeArgs.y + 1;

                        if(prevCorner && prevCorner.length) {
                            if(!data.lines[lineIndex]) {
                                data.lines.push(
                                    chart.renderer.path([])
                                    .attr({ stroke: data.color, zIndex })
                                    .add()
                                );
                            }
                            
                            data.lines[lineIndex].attr({
                                d: ['M', prevCorner[0], prevCorner[1], 'L', x, y, 'z'],
                                'stroke-width': 1
                            });

                            if(!data.visible) data.lines[lineIndex].attr({ 'stroke-width': 0 });

                            lineIndex++;
                        } 
                        
                        prevCorner = [x + point.shapeArgs.width, y]; 
                    });
                });
            },
        }
    },

    series: [{
        data: generateRandomData(6)
    }, {
        data: generateRandomData(6)
    }, {
        data: generateRandomData(6)
    }]
});