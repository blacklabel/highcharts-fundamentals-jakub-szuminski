function hslToHex(h, s, l) {
    const a = s * Math.min(l, 1 - l);
    const f = n => {
      const k = (n + h / 30) % 12,
        color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}

function createHeatmapData(choice = 'value', sliderValue = 0.5) {
    const arr = [];

    const createColor = {
        'saturation': (x, y) => hslToHex(x, sliderValue, y),
        'value': (x, y) => hslToHex(x, y, sliderValue)
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

