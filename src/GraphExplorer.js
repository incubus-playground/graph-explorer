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

        if(settings !== undefined) {
            nodes = new vis.DataSet(dataDefault.nodes);
            edges = new vis.DataSet(dataDefault.edges);

            this.visModel = {
                nodes: nodes,
                edges: edges
            };
        }

        var optionsDefault = {
            nodes: {
                shape: 'dot'
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

        network = new vis.Network(container, data, optionsDefault);
        network.setOptions(options);

        if(status) {
            this.addNode('order_details');
        }

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