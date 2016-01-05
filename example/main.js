/**
 * Created by valeriy.abornyev on 11/9/2015.
 */

    var $ = require('jquery');
var GraphExplorer = require('../src/GraphExplorer');

var container = document.getElementById('container');

var screenHeight = $(window).height();

var settings = {
    container: container,
    url: 'http://localhost:63342/graph-explorer/example/metadata.json',
    showAll: false,
    height: screenHeight + 'px',
    width: '100%'
};

window.graphExplorer =  new GraphExplorer(settings);