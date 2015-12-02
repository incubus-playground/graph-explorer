/**
 * Created by valeriy.abornyev on 11/9/2015.
 */
var GraphExplorer = require('../GraphExplorer');

    var container = document.getElementById('container');

    var settings = {
        container: container,
        data: 'http://localhost:63342/graph-explorer/src/example/metadata.json',
        showAll: true,
        height: '500px',
        width: '100%'
    };

    window.graphExplorer =  new GraphExplorer(settings);