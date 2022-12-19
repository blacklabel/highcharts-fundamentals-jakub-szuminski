const container = document.getElementById('container');

const createCircle = (x = 0, y = 0) => {
    return chart.renderer
        .circle(x, y, 5)
        .attr({ 'zIndex': 5, 'stroke': 'black', 'fill': 'blue' })
        .add();
}

container.addEventListener('mousemove', (e) => {
    if(!chart.cursorPointer) {
        chart.cursorPointer = createCircle();
    }

    chart.cursorPointer.attr({
        x: e.x,
        y: e.y
    });
});

container.addEventListener('click', (e) => {
    createCircle(e.x, e.y);
});

const chart = Highcharts.chart('container', {
    series: [{
        data: [45, 75, 110, 125, 148, 175, 135, 150, 225, 180, 80, 55],
    }]
});