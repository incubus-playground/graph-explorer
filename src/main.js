/**
 * Created by valeriy.abornyev on 11/9/2015.
 */

require(['GraphExplorer'],function (GraphExplorer) {
    // create an array with nodes

    var data = {
        nodes: [
            {id: 1, label: 'Node 1'},
            {id: 2, label: 'Node 2'},
            {id: 3, label: 'Node 3'},
            {id: 4, label: 'Node 4'},
            {id: 5, label: 'Node 5'}
        ],
        edges: [
            {from: 1, to: 3},
            {from: 1, to: 2},
            {from: 2, to: 4},
            {from: 2, to: 5}
        ]
    };
    var options = {
        height: '500px',
        width: '100%'
    };
    var container = document.getElementById('container');

    window.graphExplorer =  new GraphExplorer(container, data, options);
});
