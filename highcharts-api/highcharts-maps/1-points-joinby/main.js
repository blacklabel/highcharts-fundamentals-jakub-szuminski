Highcharts.mapChart('container', {
    chart: {
        map: 'custom/world',
    },
    series: [{
        data: [
            ['POL', 100],
            ['USA', 80],
            ['PER', 50],
            ['TZA', 40],
            ['AUS', 1],
        ],
        joinBy: 'iso-a3',
        keys: ['iso-a3', 'value']
    }, {
        type: 'mapbubble',
        joinBy: ['iso-a3', 'code3'],
        data: [
            { code3: 'POL', z: 42000 },
            { code3: 'USA', z: 38000 },
            { code3: 'AFG', z: 34656 },
            { code3: 'AUS', z: 3210 }
        ],
    }]
});
