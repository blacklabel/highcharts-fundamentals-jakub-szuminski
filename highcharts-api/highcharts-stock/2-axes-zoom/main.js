/*
---
1: STOCK CHART WITH RANDOMLY GENERATED DATA
---

Created a simple function that generates data from startDate to endDate 
(values between 0-1500)

Created a simple stock chart with 2 series on separate yAxis.
*/

const startDate = Date.UTC(2010, 4, 15) / 1000,
    endDate = Date.UTC(2020, 4, 15) / 1000;

function generateRandomData() {
    const data = [];
    for(let i = startDate; i <= endDate; i += 10000) 
        data.push([i, Math.floor(Math.random() * 1500)]);
    return data;
}

const chart = Highcharts.stockChart('container', {
    navigator: {
        enabled: false
    },
    rangeSelector: {
        enabled: false
    },
    scrollbar: {
        enabled: false
    },
    yAxis: [{
        height: '65%',
        minRange: 1,
        maxRange: 3500,
        startOnTick: false,
        endOnTick: false
    }, {
        height: '35%',
        top: '65%',
        startOnTick: false,
        endOnTick: false
    }],
    series: [{
        data: generateRandomData()
    }, {
        data: generateRandomData(),
        yAxis: 1
    }]
});

/*
---
FUNCTIONALITY 2: CHANGING YAXIS EXTREMES ON DRAG
---

If you click on yAxis (either 0 or 1) and you move your mouse, the extremes will change.

initialMouseY - y position of the mouse when clicked the axis (which starts the "drag")
initialAxisMinimum - the value of axis minimum when clicked the axis (which starts the "drag")
dragAxis - 0 if the yAxis[0] was clicked and we perform the "drag" on it or 1 if the yAxis[1] was clicked

updateRange() performs simple validation & sets new extremes for the proper yAxis
*/

let initialMouseY = 0,
    initialAxisMinimum;

let dragActive = false,
    dragAxis = 0;

function updateRange(difference) {
    const yAxis = chart.yAxis[dragAxis],
        middle = (yAxis.min + yAxis.max) / 2,
        newMin = (initialAxisMinimum + difference) > 0 ? (initialAxisMinimum + difference) : 0,
        newMax = newMin + 2 * (middle - newMin); 
        
    if(newMin >= newMax) return; 
    
    yAxis.setExtremes(newMin, newMax);
}

document.addEventListener('mousedown', (e) => {
    //1. Check if clicked on yAxis[0] or yAxis[1] (if no, return)
    if(e.clientX < chart.plotLeft || e.clientX > chart.plotLeft + chart.plotWidth) return;
    if(e.clientY < chart.plotTop || e.clientY > chart.plotTop + chart.plotHeight) return;
    
    dragAxis = (e.clientY > chart.plotTop + 0.65 * chart.plotHeight) ? 1 : 0;

    //2. If yes, set an initialMouseY, dragActive to true and save the initialAxisMinimum
    dragActive = true;
    initialMouseY = e.clientY;
    initialAxisMinimum = chart.yAxis[dragAxis].min;
});

document.addEventListener('mousemove', (e) => {
    if(!dragActive) return;
    updateRange((initialMouseY - e.clientY) * 0.45);
});

document.addEventListener('mouseup', () => {
    dragActive = false;
});

/*
---
FUNCTIONALITY 3: CHANGING AXIS EXTREMES ON WHEEL EVENT
---

If wheel moves while we hover over yAxis, we change yAxis extremes,
if not - we change xAxis extremes
*/

document.addEventListener('wheel', (e) => {
    //Checking if hovering over yLabels (not sure if it's the best method to do it)
    if( 
        chart.plotTop < e.clientY 
        && (chart.plotTop + chart.plotHeight) > e.clientY 
        && (Math.abs(chart.plotLeft + chart.plotWidth - e.clientX) <= 15)
    ) {
        const axisIndex = ((chart.plotTop + 0.75 * chart.plotHeight ) >= e.clientY) ? 0 : 1,
            yAxis = chart.yAxis[axisIndex];

        let newMin = yAxis.min + e.wheelDeltaY / 1000 * (yAxis.max - yAxis.min),
            newMax = yAxis.max - e.wheelDeltaY / 1000 * (yAxis.max - yAxis.min);
        
        if(newMin >= newMax || newMin < 0) return;

        yAxis.setExtremes(newMin, newMax);

        return;
    } 

    //If not hovering over yLabels, we change the xAxis extremes
    const xAxis = chart.xAxis[0];

    const newMin = xAxis.min + e.wheelDeltaY / 1000 * (xAxis.max - xAxis.min) 
    if((newMin < startDate) || (newMin >= endDate - 5000)) return;
    
    xAxis.setExtremes(newMin);
});