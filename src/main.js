/**
 * Created by valeriy.abornyev on 11/9/2015.
 */

require(['GraphExplorer', 'metadata'],function (GraphExplorer, metadata) {
    // create an array with nodes

    //var metadata = require('metadata');
    var container = document.getElementById('container');

    var settings = {
        container: container,
        data: metadata,
        showAll: false,
        height: '500px',
        width: '100%'
    };

    window.graphExplorer =  new GraphExplorer(settings);
});
