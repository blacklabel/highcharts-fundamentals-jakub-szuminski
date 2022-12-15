const generateRandomData = (length) => Array.from({ length }, () => Math.random() * 14);

Highcharts.chart('container', {
    chart: {
        type: 'column',

        events: {
            render() {
                const chart = this;
                console.log(this);

                let zIndex = 3;
                
                for(data of chart.series) {
                    let prevCorner = null;
                    let lineIndex = 0;
                    zIndex++;

                    if(!data.lines) data.lines = [];

                    for(point of data.points) {
                        const x = chart.plotLeft + point.shapeArgs.x,
                            y = chart.plotTop + point.shapeArgs.y + 1;

                        if(prevCorner?.length) {
                            if(data.lines[lineIndex]) {
                                data.lines[lineIndex].attr({
                                    d: ['M', prevCorner[0], prevCorner[1], 'L', x, y, 'z'],
                                    'stroke-width': 1,
                                });
                                
                                if(!data.visible) data.lines[lineIndex].attr({ 'stroke-width' : 0 });
                            } else {
                                data.lines.push(chart.renderer.path(['M', prevCorner[0], prevCorner[1], 'L', x, y, 'z']).attr({ stroke: data.color, zIndex }).add());
                            }

                            lineIndex++;
                        } 
                        
                        prevCorner = [x + point.shapeArgs.width, y];
                    }
                }
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