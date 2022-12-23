//function which takes a node and shows/hides the node with its datalabel
const changeNodeVisibility = (node, visible) => {
    const display = visible ? 'block' : 'none';
    node.graphic.css({ display });
    node.dataLabel.css({ display });
}

/*
function which iterates through all neighbors of a node and 
shows/hides the links and shows/hides the child nodes
*/
const changeNeighborsVisibility = (node, visible) => {    
    changeNodeVisibility(node, visible);
    
    //the node is already closed
    if(node.hasOwnProperty('isOpen') && !node.isOpen) return;

    //iterating through neighbors
    node.linksFrom.forEach(link => {
        link.graphic.css({ display: visible ? 'block' : 'none' });
        changeNeighborsVisibility(link.toNode, visible);
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
                    const node = this;

                    node.isOpen = node.hasOwnProperty('isOpen') ? !node.isOpen : false;

                    //iterating through child nodes & running the recursive algorithm for them
                    node.linksFrom.forEach(link => {
                        link.graphic.css({ display: node.isOpen ? 'block' : 'none' });
                        changeNeighborsVisibility(link.toNode, node.isOpen);
                    });
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