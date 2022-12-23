const changeVisibility = (node, visible, first = false) => {
    const display = visible ? 'block' : 'none';
    
    //if it's not the node we clicked, but a child, make them appear/disappear
    if(!first) {
        node.graphic.css({ display });
        node.dataLabel.css({ display });   
    } 

    //if the node isOpen === false (node's children are already invisible)
    if(!first && node.hasOwnProperty('isOpen') && !node.isOpen) return;

    node.isOpen = visible;

    //iterating through node's children, hiding the connection & changing the visibility of the child
    node.linksFrom.forEach(link => {
        link.graphic.css({ display });
        changeVisibility(link.toNode, node.isOpen);
    });
}

const chart = Highcharts.chart('container', {
    chart: {
        type: 'networkgraph',
        height: 450,
    },
    title: {
        text: '',
    },
    plotOptions: {
        networkgraph: {
            keys: ['from', 'to'],
            layoutAlgorithm: {
                friction: -0.9
            }
        }
    },
    series: [{
        dataLabels: {
            enabled: true,
            linkFormat: ''
        },
        marker: {
            radius: 20,
        },
        point: {
            events: {
                click(e) {
                    const chart = this.series.chart;

                    //node which was clicked
                    const node = chart.series[0].nodes.find(node => node.id === e.point.id);

                    //changing its state (from open => closed or from closed => open)
                    node.isOpen = node.hasOwnProperty('isOpen') ? !node.isOpen : false;

                    //starting the recursive algorithm that changes visibility
                    changeVisibility(node, node.isOpen, first = true);
                }
            }
        },
        data: [
            //Mueed
            ['Mueed', 'Sister'],
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