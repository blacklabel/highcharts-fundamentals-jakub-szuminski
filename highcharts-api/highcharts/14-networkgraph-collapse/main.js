const changeVisibility = (node, visible, first = false) => {
    if(first) {
        console.log('First Node (', visible, ')');
        
    } else {
        console.log('changing visibility to ', visible);

        node.update({ visible });

        //hide the node 

        // chart.series[0].points.find(point => point.from === node.id).update({
        //     visible
        // });
        //node.update({ visible });
    }
    
    /*
    const points = chart.series[0].points.filter(point => point.from === node.id);
    const nodes = node.linksFrom.map(link => link.toNode);
    
    if(points) {
        console.log('Points: ', points);
        //points.forEach(point => point.update({ visible }));
    } */
    
    if(!node.linksFrom) return;
    
    node.linksFrom.forEach(link => {
        changeVisibility(link.toNode, visible);
    })
}

const chart = Highcharts.chart('container', {
    chart: {
        type: 'networkgraph',
        height: 450
    },
    title: {
        text: '',
    },
    plotOptions: {
        networkgraph: {
            keys: ['from', 'to'],
            layoutAlgorithm: {
                //enableSimulation: false,
                friction: -0.9
            }
        }
    },
    series: [{
        dataLabels: {
            enabled: true,
            linkFormat: ''
        },
        nodes: [{
            id: 'Mueed',
            color: 'red',
            mass: 50,
        }],
        marker: {
            radius: 20,
        },
        point: {
            events: {
                click(e) {
                    //console.log('Clicked Event - context: ', this);
                    //console.log('Clicked Event - event: ', e);

                    //e.point.id - "Mueed"

                    const chart = this.series.chart;
                    console.log('Chart: ', chart);

                    
                    //node which was clicked
                    const node = chart.series[0].nodes.find(node => node.id === e.point.id);
                    const isOpen = node.hasOwnProperty('isOpen') ? !node.isOpen : true;

                    node.update({ isOpen });

                    const point = chart.series[0].points[0];
                    
                    console.log(point);
                    point.graphic.attr({
                        'stroke-width': 0,
                    });

                    const linksFrom = this.linksFrom;
                    //console.log('Links from: ', linksFrom);

                    //console.log(chart.series[0].nodes);

                    //changeVisibility(node, isOpen, true);
                }
            }
        },
        data: [
            {from: 'Mueed', to: 'Sister', visible : false },
            ['Mueed', 'Spouse'],
            ['Mueed', 'Brother'],
            ['Mueed', 'Son'],
            ['Mueed', 'Mother'],
            ['Mueed', 'Father'],
            ['Mueed', 'Brother in law'],
            ['Mueed', 'Mother in law'],

            //Father
            ['Father', 'anwar'],

            //Brother in law
            ['Brother in law', 'nabel'],
            ['Brother in law', 'shahzbob'],

            //Mother in law
            ['Mother in law', 'heyas'],
            ['Mother in law', 'babas'],
        ],
    }]
});