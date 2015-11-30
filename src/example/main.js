/**
 * Created by valeriy.abornyev on 11/9/2015.
 */

require(['GraphExplorer'],function (GraphExplorer) {
    // create an array with nodes

    var container = document.getElementById('container');

    var settings = {
        container: container,
        data: 'http://localhost:63342/graph-explorer/src/example/metadata.json',
        showAll: false,
        height: '500px',
        width: '100%'
    };

    window.graphExplorer =  new GraphExplorer(settings);
});
