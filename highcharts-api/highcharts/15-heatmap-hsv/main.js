function hsvToRgb(hue, saturation, value) {
    const M = 255 * value,
        m = M * (1 - saturation),
        z = (M - m) * (1 - Math.abs((hue / 60) % 2 - 1));

    let R, G, B;

    if(hue < 60) { R = M; G = z + m; B = m; } 
    else if (hue < 120) { R = z + m; G = M; B = m; } 
    else if (hue < 180) { R = m; G = M; B = z + m; } 
    else if (hue < 240) { R = m; G = z + m; B = M; } 
    else if (hue < 300) { R = z + m; G = m; B = M; } 
    else if (hue < 360) { R = M; G = m; B = z + m; }

    R = Math.round(R);
    G = Math.round(G);
    B = Math.round(B);

    return `rgba(${R}, ${G}, ${B})`;
}

function hslToHex(h, s, l) {
    const a = s * Math.min(l, 1 - l);
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
    };

    const result = `#${f(0)}${f(8)}${f(4)}`;
    console.log('Conversion result: ', result);

    return `#${f(0)}${f(8)}${f(4)}`;
}

let arr = [];

/*
for(let x = 0; x < 360; x += 10) {
    for(let y = 0; y < 1; y += 0.025) {
        arr.push([x, y, x * y]);
        //arr.push([x, y, hsvToRgb(x, y, 1)]);
    }
}*/

for(let x = 0; x < 360; x += 1) {
    for(let y = 0; y < 1; y += 0.1) {
        arr.push([x, y, x * y]);
    }
}

//console.log(arr);


Highcharts.chart('container', {
    chart: {
        type: 'heatmap'
    },
    
    title: {
        text: 'Heatmap of colors in HSV'
    },

    plotOptions: {
        series: {
            turboThreshold: 10000
        }
    },

    colorAxis: {
        min: 0,
        max: 10,
        
    },

    yAxis: {
        min: 0,
        max: 1,
        tickInterval: 0.1,
    },

    xAxis: {
        min: 0,
        max: 360,
        tickInterval: 60,
    },

    //step y: 0.05
    //step x: 36 (to 360)
    
    series: [{
        name: 'Colors',
        data: arr
    }]
});

const form = document.getElementById('form'),
    slider = document.getElementById('slider');

form.addEventListener('change', () => {
    console.log('form changed');

    const choice = document.querySelector('input[name="property_choice"]:checked')?.value;
    if(!choice) return;

    console.log(choice);
})

//Data generation
//x from 0 to 360 (step by 10 degrees)
//y from 0 to 1 (step by 0.025)

