/**
 * Created by valeriy.abornyev on 11/9/2015.
 */

    var $ = require('jquery');
var GraphExplorer = require('../src/GraphExplorer');

var container = document.getElementById('container');

var screenHeight = $(window).height();

var settings = {
    container: container,
    url: './metadata.json',
    showAll: false,
    height: screenHeight + 'px',
    width: '100%'
};

window.graphExplorer =  new GraphExplorer(settings);