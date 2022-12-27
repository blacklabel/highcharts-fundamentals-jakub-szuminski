Highcharts.ganttChart('container', {
    chart: {
        events: {
            load() {
                this.xAxis[1].remove();
            }
        }
    },
    
    xAxis: {
        labels: {
            formatter() {
                return new Date(this.value).toLocaleDateString('en-us', { weekday:"long", day:"numeric", month:"short", year:"numeric" }) ;
            }
        },
    },

    yAxis: {
        categories: ['Main', 'First', 'Second'],
    },

    series: [{
        name: 'Project 1',
        data: [{
            name: 'Main',
            pointWidth: 0,
            y: 0,
        }, {
            name: 'First',
            start: 1560902400000,
            end: 1561075200000,
            y: 1,
        }, {
            name: 'Second',
            start: 1560902400000,
            end: 1561075200000,
            y: 2,
        }, {
            name: 'Second',
            start: 1561507200000,
            end: 1561680000000,
            y: 2
        }],
    }]

});
