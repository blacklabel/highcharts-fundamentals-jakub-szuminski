const categories = ["Dep1", "Dep2", "Dep3", "Dep4", "Dep5"];

Highcharts.chart("container", {
    chart: {
        type: 'bar',
        marginTop: 50,
        marginLeft: 20,
        marginRight: 20,
        events: {
            load() {
                const leftAxis = this.yAxis[0],
                    rightAxis = this.yAxis[1];

                leftAxis.update({
                    title: {
                        y: -(this.plotHeight + 50)
                    }
                }, false);

                rightAxis.update({
                    title: {
                        y: -(this.plotHeight + 50)
                    }
                });
            },
        }
    },
    title: {
        text: ""
    },
    plotOptions: {
        bar: {
            stacking: 'overlap'
        }
    },
    xAxis: {
        categories: categories,
        title: {
            text: "",
        },
        lineWidth: 0,
        labels: {
            align: 'left',
        },
        left: '50%',
        width: '20%'  
    },
    legend: {
        enabled: false
    },
    yAxis: [
        {
            max: 100,
            width: '40%',
            reversed: true,
            title: {
                text: 'Non managerial position',
            },
            backgroundColor: 'gray',
        },
        {
            max: 100,
            width: '40%',
            offset: 0,
            left: '60%',
            title: {
                text: 'Managerial position',
            }
        },
    ],
    series: [
        {
            data: [100, 100, 100, 100, 100], 
            color: 'gray',
            yAxis: 0,
            enableMouseTracking: false
        },
        {
            data: [50, 64, 50, 60, 86],
            color: "red",
            yAxis: 0,
            dataLabels: {
                enabled: true,
                inside: 'true',
                align: "right",
                format: '{y}%'
            }
        },
        {
            data: [100, 100, 100, 100, 100],
            color: 'gray',
            yAxis: 1,
            enableMouseTracking: false
        },
        {
            data: [68, 57, 45, 22, 88],
            color: "red",
            yAxis: 1,
            dataLabels: {
                enabled: true,
                inside: 'true',
                align: "left",
                format: '{y}%'
            }
        }
    ]
});
