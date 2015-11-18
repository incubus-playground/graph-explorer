/**
 * Created by valeriy.abornyev on 11/9/2015.
 */
define(function(require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery'),
        vis = require('vis'),
        GroupModel = require('model/GroupModel'),
        ElementModel = require('model/ElementModel'),
        ElementsCollection = require('collection/ElementsCollection');


    function GraphExplorer(settings) {
        var data;
        var status = false;
        var self = this;
        this.container = settings.container;
        this.options = settings.options;
        var dataDefault = {
            nodes: [],
            edges: []
        };
        this.nodesOnCanvas = [];

        if(settings !== undefined) {
            nodes = new vis.DataSet(dataDefault.nodes);
            edges = new vis.DataSet(dataDefault.edges);

            this.visModel = {
                nodes: nodes,
                edges: edges
            };
        }

        this.optionsDefault = {
            nodes: {
                shape: 'dot'
            },
            edges: {
                smooth: {
                    enabled: false
                },
                physics: false
            },
            physics: {
                enabled: true
            },
            groups: {
                suggestion: {
                    shape: 'box'
                }
            }
        };

        var options = {
            width: settings.width,
            height: settings.height
        };

        this.dataCollection = new ElementsCollection(settings.data.elements);
        //var temp = this.dataCollection.findCollection("public");

        if(settings.showAll) {
            data = this.dataCollection.generateVisModel();
        } else {
            data = this.visModel;
            status = true;
        }

        network = new vis.Network(container, data, this.optionsDefault);
        network.setOptions(options);

        if(status) {
            this.showNode('order_details');
        }



        network.on('click', function (params) {
            params.event = "[original event]";
            console.log(JSON.stringify(params, null, 4));
        });
    }

    GraphExplorer.prototype.destroy = function() {
        network.destroy();
    };

    GraphExplorer.prototype.addAllData = function() {
        network.destroy();
        network = new vis.Network(this.container, this.dataCollection.generateVisModel(), this.options);
    };

    GraphExplorer.prototype.showNode = function(nodeId) {
        var model = this.dataCollection.findCollection(nodeId);
        var self = this;
        var nodeName = model.get('name');
        this.elements = model.get('elements');
        this.referenceTo = false;

        this.elements.each(function(item) {
            if(item.get('referenceTo') !== undefined) {
                edges.add({from: model.get('name'), to: item._getRelatedTableName(item.get('referenceTo')), arrows:'to'});
                self.referenceTo = true;
            }
        });

        if(this.referenceTo) {
            nodes.add({id: nodeName, label: nodeName, group: ''});
            showPlusIcon(nodeName);

        } else {
            nodes.add({id: nodeName, label: nodeName, group: ''});
        }
        this.nodesOnCanvas.push(nodeName);
    };

    GraphExplorer.prototype.expandNode = function(nodeId) {
        var self = this;
        this.raferenceToArray = [];
        var options = {
            physics: {
                enabled: false
            }
        };
        network.setOptions(options);

        var model = this.dataCollection.findCollection(nodeId);
        this.elements = model.get('elements');

        this.elements.each(function(model) {
        if(model.get('referenceTo') !== undefined ) {
            if(!nodes._data[model._getRelatedTableName(model.get('referenceTo'))]) {
                nodes.add({id: model._getRelatedTableName(model.get('referenceTo')), label: model._getRelatedTableName(model.get('referenceTo')), group: 'suggestion'});
                self.raferenceToArray.push(model._getRelatedTableName(model.get('referenceTo')));
            }

        }
    });
        console.log(this.nodesOnCanvas);
        network.redraw();
    };

    GraphExplorer.prototype.collapseNode = function(nodeId) {
        var options = {
            physics: {
                enabled: true
            }
        };
        network.setOptions(options);
        nodes.remove(this.raferenceToArray);

        network.redraw();
    };

    function showPlusIcon(nodeId) {
        network.on('afterDrawing', function (ctx) {
            //var nodeId = 'order_details';
            var nodePosition = network.getPositions([nodeId]);
            ctx.strokeStyle = '#2B7CE9';
            ctx.fillStyle = 'rgba(0,0,0,0)';
            ctx.beginPath();
            ctx.circle(nodePosition[nodeId].x, nodePosition[nodeId].y,7);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = '#2B7CE9';
            ctx.beginPath();
            ctx.fillRect(nodePosition[nodeId].x-1, nodePosition[nodeId].y-5, 2, 10);
            ctx.fillRect(nodePosition[nodeId].x-5, nodePosition[nodeId].y-1, 10, 2);
            ctx.closePath();
            ctx.fill();
        });
    }

    function freezPhysics() {

    }

    return GraphExplorer;

});