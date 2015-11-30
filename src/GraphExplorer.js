/**
 * Created by valeriy.abornyev on 11/9/2015.
 */
define(function(require) {
    var vis = require('vis'),
        $ = require('jquery'),
        GroupModel = require('GroupModel'),
        ElementModel = require('ElementModel'),
        ElementsCollection = require('ElementsCollection');


    function GraphExplorer(settings) {
        var data;
        var status = false;
        var statusSuggestion = false;
        this.temp = true;
        var self = this;
        this.container = settings.container;
        this.options = settings.options;
        this.inputData = {};


        $.ajax({
            method: 'get',
            url: settings.data,
            success: function (data) {
                self.inputData = data.elements;
                self.dataCollection = new ElementsCollection(self.inputData);
                var dataDefault = {
                    nodes: [],
                    edges: []
                };
                self.nodesOnCanvas = [];

                if(settings !== undefined) {
                    nodes = new vis.DataSet(dataDefault.nodes);
                    edges = new vis.DataSet(dataDefault.edges);

                    self.visModel = {
                        nodes: nodes,
                        edges: edges
                    };
                }

                self.optionsDefault = {
                    nodes: {
                        shape: 'dot',
                        color: {
                            background: '#97C2FC',
                            highlight: {
                                border: '#2B7CE9',
                                background: '#97C2FC'
                            }
                        }
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



                if(settings.showAll) {
                    data = self.dataCollection.generateVisModel();
                } else {
                    data = self.visModel;
                    status = true;
                }

                network = new vis.Network(container, data, self.optionsDefault);
                network.setOptions(options);

                if(status) {
                    self.showNode('order_details');
                }



                network.on('click', function (params) {
                    params.event = "[original event]";
                    console.log(JSON.stringify(params, null, 4));

                    var nodeName = params.nodes[0];
                    var nodePosition = network.getPositions(nodeName);

                    if(params.nodes.length > 0 && nodes._data[nodeName].group !== 'suggestion') {
                        if(
                            (nodePosition[nodeName].x - 7) < params.pointer.canvas.x &&
                            (nodePosition[nodeName].x + 7) > params.pointer.canvas.x &&
                            (nodePosition[nodeName].y + 7) > params.pointer.canvas.y &&
                            (nodePosition[nodeName].y - 7) < params.pointer.canvas.y
                        ){
                            if(!statusSuggestion) {
                                self.expandNode(nodeName);
                                statusSuggestion = true;
                            } else {
                                self.collapseNode(nodeName);
                                statusSuggestion = false;
                            }

                        }
                    } else if(params.nodes.length > 0 && nodes._data[nodeName].group == 'suggestion') {
                        var nodeX = nodePosition[nodeName].x;
                        var nodeY = nodePosition[nodeName].y;

                        self.collapseNode(nodeName);
                        statusSuggestion = false;

                        self.showNode(nodeName, nodeX, nodeY);
                    }
                });
            }
        });

    }

    function generateVisModelFromData(data) {
        var visModel = {
            nodes: [],
            edges: []
        };
        var elements;
        data.forEach(function(item) {
            console.log(item.group.name);
            if(item.group.elements) {
                for(; elements; elements = item.group.elements){
                    console.log(elements.group.name);
                }
            }
        });
        return visModel;
    }

    GraphExplorer.prototype.destroy = function() {
        network.destroy();
    };

    GraphExplorer.prototype.addAllData = function() {
        network.destroy();
        network = new vis.Network(this.container, this.dataCollection.generateVisModel(), this.options);
    };

    GraphExplorer.prototype.showNode = function(nodeId, x, y) {
        var model = this.dataCollection.findCollection(nodeId);
        var self = this;
        var countEdges = 0;
        var nodeName = model.get('name');
        this.elements = model.get('elements');
        this.referenceTo = false;

        this.elements.each(function(item) {
            if(item.get('referenceTo') !== undefined) {
                edges.add({from: model.get('name'), to: item._getRelatedTableName(item.get('referenceTo')), arrows:'to'});
                self.referenceTo = true;
                countEdges++;
            }
        });

        if(x || y) {
            nodes.add({id: nodeName, label: nodeName, x: x, y: y, group: '', referenceTo: countEdges});
        } else {
            nodes.add({id: nodeName, label: nodeName, group: '', referenceTo: countEdges});
        }
        this.nodesOnCanvas.push(nodeName);

        this.nodesOnCanvas.forEach(function(nodeId){
            var nodeModel = self.dataCollection.findCollection(nodeId);

            var countReference = getReferencesCount(nodeModel);

            if(countReference === nodes._data[nodeId].referenceTo) {
                deletePlusIcon(nodeId);
            }

        });

        function getReferencesCount(model) {
            var countReference = 0;
            model.get('elements').each(function(model) {
                if(model.get('referenceTo') !== undefined && self.nodesOnCanvas.indexOf(model._getRelatedTableName(model.get('referenceTo'))) !== -1) {
                    return countReference++;
                }
            });
            return countReference
        }

        if(this.referenceTo) {
            showPlusIcon(nodeName);
        }
    };

    GraphExplorer.prototype.expandNode = function(nodeId) {
        var self = this;
        var count = 0;
        this.raferenceToArray = [];
        var nodePosition = network.getPositions([nodeId]);
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
                    nodes.add({
                        id: model._getRelatedTableName(model.get('referenceTo')),
                        label: model._getRelatedTableName(model.get('referenceTo')),
                        x: nodePosition[nodeId].x + 100,
                        y: (function(){if(count % 2 == 0) {
                                if(count ==0) {
                                    return nodePosition[nodeId].y + (30 * count)
                                } else {
                                    return nodePosition[nodeId].y + (30 * (count-1))
                                }
                            } else {return nodePosition[nodeId].y - (30 * count)}})(),
                        group: 'suggestion'
                    });
                    count++;
                    self.raferenceToArray.push(model._getRelatedTableName(model.get('referenceTo')));
                    console.log(self.raferenceToArray);
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
        this.raferenceToArray = [];
        network.redraw();
    };

    GraphExplorer.prototype.getVisibleDataSet = function() {
        var self = this;
        var outputData = {
            elements: [],
            name: 'outputData'
        };
        this.nodesOnCanvas.forEach(function(nodeId){

            function getNodeGroup(data) {
                data.forEach(function(item) {
                    if(!item.element && item.group.name == nodeId) {
                        outputData.elements.push(item);
                    } else if(!item.element && item.group.elements) {
                        getNodeGroup(item.group.elements);
                    }
                });

                return outputData;
            }
            getNodeGroup(self.inputData);
        });
        return outputData;
    };

    function showPlusIcon(nodeId) {
            network.on('afterDrawing', function (ctx) {
                var nodePosition = network.getPositions([nodeId]);
                ctx.strokeStyle = '#2B7CE9';
                ctx.fillStyle = 'rgba(0,0,0,0)';
                ctx.beginPath();
                ctx.circle(nodePosition[nodeId].x, nodePosition[nodeId].y, 7);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                ctx.fillStyle = '#2B7CE9';
                ctx.beginPath();
                ctx.fillRect(nodePosition[nodeId].x - 1, nodePosition[nodeId].y - 5, 2, 10);
                ctx.fillRect(nodePosition[nodeId].x - 5, nodePosition[nodeId].y - 1, 10, 2);
                ctx.closePath();
                ctx.fill();
            });
    }

    function deletePlusIcon(nodeId) {

        network.on('afterDrawing', function (ctx) {
            var nodePosition = network.getPositions([nodeId]);
            ctx.fillStyle = '#97C2FC';
            ctx.beginPath();
            ctx.fillRect(nodePosition[nodeId].x-8, nodePosition[nodeId].y-8, 16, 16);
            ctx.closePath();
            ctx.fill();
        });
    }



    return GraphExplorer;

});