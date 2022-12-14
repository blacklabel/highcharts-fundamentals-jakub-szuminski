const categories = ["Dep1", "Dep2", "Dep3", "Dep4", "Dep5"];

Highcharts.chart("container", {
    chart: {
        marginTop: 50,

        events: {
            load() {
                this.xAxis[0].update({
                    left: this.yAxis[0].left + this.yAxis[0].width + (this.yAxis[1].left - this.yAxis[0].width) / 2
                });

                this.yAxis[1].update({
                    title: {
                        text: "Manegrial Position",
                        y: -(this.plotHeight + 50)
                    },
                });

                this.yAxis[0].update({
                    title: {
                        text: 'Non-managerial position',
                        y: -(this.plotHeight + 50),
                    }
                });
            },
            
        }
    },
    
    title: {
        text: "",
    },

    xAxis: {
        categories: categories,
        title: {
            text: "",
        },
        lineWidth: 0,
    },

    plotOptions: {
        series: {
            stacking: "normal",
        },
    },

    legend: {
        enabled: false,
    },

    yAxis: [
        {
            max: 1,
            width: 320,
            
            labels: {
                formatter() {
                    return this.value * 100;
                },
            },

            reversed: true,
        },
        {
            max: 1,
            width: 320,
            
            labels: {
                formatter() {
                    return this.value * 100;
                },
            },

            offset: 0,
            left: 500,
        },
    ],

    series: [
        {
            type: "bar",
            data: [0.5, 0.36, 0.5, 0.4, 0.14],
            color: "gray",
            yAxis: 0,
        },
        {
            type: "bar",
            data: [0.5, 0.64, 0.5, 0.6, 0.86],

            color: "red",
            yAxis: 0,

            dataLabels: {
                enabled: true,
                align: "right",
                
                formatter() {
                    return Math.floor(this.y * 100) + "%";
                },
            },
        },
        {
            type: "bar",
            data: [0.32, 0.43, 0.55, 0.78, 0.12],
            yAxis: 1,
            color: "gray",
        },
        {
            type: "bar",
            data: [0.68, 0.57, 0.45, 0.22, 0.88],
            
            yAxis: 1,
            color: "red",
            dataLabels: {
                enabled: true,
                align: "left",
                formatter() {
                    return Math.floor(this.y * 100) + "%";
                },
            },
        },
    ],
});
