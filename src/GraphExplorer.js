/**
 * Created by valeriy.abornyev on 11/9/2015.
 */
define(function(require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery'),
        vis = require('vis'),
        metadata = require('metadata'),
        GroupModel = require('model/GroupModel'),
        ElementModel = require('model/ElementModel'),
        ElementsCollection = require('collection/ElementsCollection');


    function GraphExplorer(container, data, options) {
        this.container = container;
        this.options = options;
        var settings = {
            nodes: [],
            edges: []
        };

        if(settings !== undefined) {
            nodes = new vis.DataSet(settings.nodes);
            edges = new vis.DataSet(settings.edges);

            this.visModel = {
                nodes: nodes,
                edges: edges
            };
        }

        this.dataCollection = new ElementsCollection(metadata.elements);
        //dataCollection.findCollection("customers");
        var temp = this.dataCollection.findCollection("public");
        //var visData = this.dataCollection.generateVisModel();

        network = new vis.Network(container, this.visModel, options);

    }

    GraphExplorer.prototype.destroy = function() {
        network.destroy();
    };

    GraphExplorer.prototype.addAllData = function() {
        network.destroy();
        network = new vis.Network(this.container, this.dataCollection.generateVisModel(), this.options);
    };

    GraphExplorer.prototype.addNode = function(nodeId) {
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
            nodes.add({id: nodeName, label: nodeName,group: 'icons'});
        } else {
            nodes.add({id: nodeName, label: nodeName, group: ''});
        }
    };

    return GraphExplorer;

});