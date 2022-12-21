function hslToHex(h, s, l) {
    const a = s * Math.min(l, 1 - l);
   
    const f = n => {
      const k = (n + h / 30) % 12,
        color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
    };

    return `#${f(0)}${f(8)}${f(4)}`;
}

function createHeatmapData(parameter, value) {
    const arr = [];
    const val = value ? (value / 100) : 0.5;

    for(let x = 0; x <= 360; x += 10) {
        for(let y = 0; y <= 1; y += 0.025) {
            arr.push({ 
                x, y, 
                color: parameter === 'Saturation' ? hslToHex(x, val, 0.5) : hslToHex(x, y, val)
            });
        }
    }

    return arr;
}

const chart = Highcharts.chart('container', {
    chart: {
        type: 'heatmap',
        events: {
            load() {
                this.update({
                    chart: {
                        height: this.plotWidth
                    }
                });
            }, 
        }
    },

    boost: {
        useGPUTranslations: true,
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
            colsize: 10,
            rowsize: 0.025,
            turboThreshold: 160000
        }
    },

    series: [{
        boostTreshold: 1500,
        name: 'Colors',
        data: createHeatmapData()
    }]
});

const form = document.getElementById('form'),
    slider = document.getElementById('slider');

form.addEventListener('change', () => {
    console.log('form changed');

    const choice = document.querySelector('input[name="property_choice"]:checked')?.value;
    if(!choice) return;

    console.log(`${choice} : ${slider.value}`);

    chart.series[0].update({
        data: createHeatmapData(choice, slider.value)
    });
})

