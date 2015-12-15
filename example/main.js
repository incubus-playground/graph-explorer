/**
 * Created by valeriy.abornyev on 11/9/2015.
 */
var GraphExplorer = require('../src/GraphExplorer');

var container = document.getElementById('container');

var settings = {
    container: container,
    url: 'http://localhost:63342/graph-explorer/example/metadata.json',
    showAll: false,
    height: '500px',
    width: '100%'
};

window.graphExplorer =  new GraphExplorer(settings);