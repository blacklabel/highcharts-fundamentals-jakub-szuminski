/*
This function takes three parameters (of an HSL color): 
- hue (0 to 360 degrees), 
- saturation (0 to 1), 
- value (0 to 1)
and returns a corresponding HEX color.

The function was taken from this source:
https://stackoverflow.com/questions/36721830/convert-hsl-to-rgb-and-hex

The calculations are based on this repo:
https://gist.github.com/mjackson/5311256
*/

function convertHSLtoHEX(hue, saturation, value) {
    const a = saturation * Math.min(value, 1 - value);
    const f = n => {
      const k = (n + hue / 30) % 12,
        color = value - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        //convert to HEX and prefix "0" if needed
        return Math.round(255 * color).toString(16).padStart(2, '0');   
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}

function createHeatmapData(choice = 'value', sliderValue = 0.5) {
    const arr = [];

    const createColor = {
        'saturation': (x, y) => convertHSLtoHEX(x, sliderValue, y),
        'value': (x, y) => convertHSLtoHEX(x, y, sliderValue)
    }

    for(let x = 0; x <= 360; x += 15) {
        for(let y = 0; y <= 1; y += 0.0375) {
            arr.push({ x, y, color: createColor[choice](x, y) })
        }
    }

    return arr;
}

const chart = Highcharts.chart('container', {
    chart: {
        type: 'heatmap',
        height: 400,
    },
    
    title: {
        text: 'Heatmap of colors in HSV'
    },

    yAxis: {        
        tickInterval: 0.05,
        title: {
            text: 'S'
        }
    },

    xAxis: {
        min: 0,
        max: 360,
        tickInterval: 36,
        endOnTick: true,
        title: {
            text: 'H'
        }
    },

    plotOptions: {
        heatmap: {
            colsize: 15,
            rowsize: 0.0375,
            turboThreshold: 160000
        }
    },

    series: [{
        name: 'Colors',
        data: createHeatmapData()
    }]
});

const form = document.getElementById('form'),
    slider = document.getElementById('slider');

form.addEventListener('change', () => {
    const choice = document.querySelector('input[name="property_choice"]:checked')?.value;
    if(!choice) return;

    chart.yAxis[0].update({
        title: {
            text: choice === 'value' ? 'S' : 'V'
        }
    }, false);

    chart.series[0].update({
        data: createHeatmapData(choice, slider.value / 100)
    });
});

