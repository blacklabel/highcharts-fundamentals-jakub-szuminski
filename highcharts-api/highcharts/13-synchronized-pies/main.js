Highcharts.chart('container', {
    chart: {
        events: {
            load() {
                const chart = this;
                chart.addSeries({
                    type: 'pie',
                    center: ['75%', '50%'],
                    data: chart.series[0].data.map(el => ({ name: el.name, y: el.y }))
                });
            }
        }
    },

    plotOptions: {
        pie: {
            size: '50%',
            dataLabels: {
                enabled: false,
            },
            point: {
                events: {
                    mouseOver(e) {
                        const chart = this.series.chart,
                            otherSeries = chart.series[e.target.series.index === 0 ? 1 : 0], //another pie series
                            otherPoint = otherSeries.points[e.target.x]; //corresponding point in another pie 

                        otherSeries.points[e.target.x].setState('hover');
                        
                        if(!chart.secondTooltip) chart.secondTooltip = new Highcharts.Tooltip(chart, chart.tooltip.options);
                        chart.secondTooltip.refresh(otherPoint);
                    },
                    mouseOut(e) {
                        const chart = this.series.chart;
                        if(chart.secondTooltip) {
                            chart.secondTooltip.destroy();
                        }
                    },
                    legendItemClick(e) {
                        this.series.chart.series[1].points[e.target.x].update({
                            visible: !e.target.visible
                        });
                    }
                }
            }
        },
    },

    series: [{
        type: 'pie',
        center: ['25%', '50%'],
        showInLegend: true,
        data: [{
            name: 'Commerce',
            y: 70,
        }, {
            name: 'Engineering',
            y: 30,
        }, {
            name: 'Financial Services',
            y: 18.8
        }, {
            name: 'Logistics, Aviation & Shipping',
            y: 5.5
        }, {
            name: 'Seafood & Marine',
            y: 9.8
        }, {
            name: 'Corporate Services & oters',
            y: 3.5
        }]
    }]
});
