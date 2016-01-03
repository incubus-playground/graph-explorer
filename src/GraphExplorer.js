/**
 * Created by valeriy.abornyev on 11/9/2015.
 */

var vis = require('vis'),
    $ = require('jquery'),
    showPlusIcon = require('./helpers/showPlusIcon'),
    checkSuggestionOnCanvas = require('./helpers/checkSuggestionOnCanvas'),
    SuggestionsView = require('./SuggestionsView'),
    ElementsCollection = require('./ElementsCollection');


function GraphExplorer(settings) {
    this.settings = settings;
    var self = this;
    this.container = settings.container;
    this.options = settings.options;
    this.nodesOnCanvas = [];
    this.raferenceToArray = {};


    self.dataCollection = new ElementsCollection([], {url: settings.url});

    self.dataCollection.on('sync', this.buildNodeCanvas, this);

    self.dataCollection.fetch();



}

GraphExplorer.prototype.buildNodeCanvas = function () {
    var settings = this.settings;
    var self = this;
    var visData;
    var status = false;
    this.statusSuggestion = false;

    var options = {
        width: settings.width,
        height: settings.height
    };

    var dataDefault = {
        nodes: [],
        edges: []
    };


    this.optionsDefault = {
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



    if(settings !== undefined) {
        nodes = new vis.DataSet(dataDefault.nodes);
        edges = new vis.DataSet(dataDefault.edges);

        this.visModel = {
            nodes: nodes,
            edges: edges
        };
    }

    if(settings.showAll) {
        visData = this.dataCollection.generateVisModel();
        nodes = new vis.DataSet(visData.nodes);
        edges = new vis.DataSet(visData.edges);
        data = {
            nodes: nodes,
            edges: edges
        };
    } else {
        data = this.visModel;
        status = true;
    }



    network = new vis.Network(container, data, this.optionsDefault);
    network.setOptions(options);

    if(status) {
        self.showNode('order_details');
    }

    //network.on('click', this.clickHandler.bind(this));
    network.on('click', this.showSuggestionsPopup.bind(this));

    this.suggestionCollection = new Backbone.Collection();
    this.activeView = new SuggestionsView({collection: this.suggestionCollection});
    $("#container").append(this.activeView.render().$el);

    //$('.button-cancel').click = this.hideSuggestionsPopup();
    $('.button-cancel').on('click', this.hideSuggestionsPopup.bind(this));
};

GraphExplorer.prototype.showSuggestionsPopup = function(params) {
    var self = this;

    params.event = "[original event]";
    console.log(JSON.stringify(params, null, 4));

    var nodeName;

    var clickDOMPositionX = params.pointer.DOM.x;
    var clickDOMPositionY = params.pointer.DOM.y;
    var nodeNamePlusClicked = network.getNodeAt({x: clickDOMPositionX - 26, y: clickDOMPositionY + 40});

    if(nodeNamePlusClicked == undefined && params.nodes[0] !== undefined) {
        nodeName = params.nodes[0];
    } else if(nodeNamePlusClicked !== undefined){
        nodeName = nodeNamePlusClicked;
    }

    var nodePosition = network.getPositions(nodeName);

    if(nodeName !== undefined) {
        if(
            (nodePosition[nodeName].x + 19) < params.pointer.canvas.x &&
            (nodePosition[nodeName].x + 30) > params.pointer.canvas.x &&
            (nodePosition[nodeName].y - 18) > params.pointer.canvas.y &&
            (nodePosition[nodeName].y - 31) < params.pointer.canvas.y
        ) {
            this.suggestionArrey = this.getSuggestions(nodeName);
            this.suggestionCollection.add(this.suggestionArrey);
            $('.network-popUp').show();
        }
    }

};

GraphExplorer.prototype.hideSuggestionsPopup = function() {
    this.suggestionCollection.remove(this.suggestionArrey);
    $('.network-popUp').hide();
};

GraphExplorer.prototype.getSuggestions = function(nodeName) {
    console.log(nodeName);
    var referenceArrey = [];
    var model = this.dataCollection.findCollection(nodeName);

    this.elements = model.get('elements');

    this.elements.each(function(item) {
        if(item.get('referenceTo') !== undefined) {
            referenceArrey.push(item);
        }
    });
    console.log(referenceArrey);
    return referenceArrey;
};

GraphExplorer.prototype.clickHandler = function(params) {
    var self = this;

    params.event = "[original event]";
    console.log(JSON.stringify(params, null, 4));

    var nodeName;

    var clickDOMPositionX = params.pointer.DOM.x;
    var clickDOMPositionY = params.pointer.DOM.y;
    var nodeNamePlusClicked = network.getNodeAt({x: clickDOMPositionX - 26, y: clickDOMPositionY + 40});

    if(nodeNamePlusClicked == undefined && params.nodes[0] !== undefined) {
        nodeName = params.nodes[0];
    } else if(nodeNamePlusClicked !== undefined){
        nodeName = nodeNamePlusClicked;
    }

    var nodePosition = network.getPositions(nodeName);

    openCloseSuggestionList(nodeName);

    function openCloseSuggestionList(nodeId) {
        if(nodeId !== undefined && nodes._data[nodeId].group !== 'suggestion') {
            if(
                (nodePosition[nodeId].x + 19) < params.pointer.canvas.x &&
                (nodePosition[nodeId].x + 30) > params.pointer.canvas.x &&
                (nodePosition[nodeId].y - 18) > params.pointer.canvas.y &&
                (nodePosition[nodeId].y - 31) < params.pointer.canvas.y
            ) {
                if(!nodes._data[nodeId].suggestionOpen && nodes._data[nodeId].suggestionOpen == undefined) {
                    self.expandNode(nodeId);
                } else {
                    self.collapseNode(nodeId);
                }
            }
        } else if(nodeId !== undefined && nodes._data[nodeId].group == 'suggestion') {
            var nodeX = nodePosition[nodeId].x;
            var nodeY = nodePosition[nodeId].y;

            self.collapseNode(nodes._data[nodeId].referenceFrom);

            self.showNode(nodeId, nodeX, nodeY);
        }
    }
};



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
    self.delPlusIconStatus = true;

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

    showPlusIcon.call(this);
};

GraphExplorer.prototype.expandNode = function(nodeId) {
    var self = this;
    var count = 0;

    var nodePosition = network.getPositions([nodeId]);
    var options = {
        physics: {
            enabled: false
        }
    };
    network.setOptions(options);

    var modelNode = this.dataCollection.findCollection(nodeId);
    this.elements = modelNode.get('elements');

    nodes._data[modelNode.get('name')].suggestionOpen = true;
    self.raferenceToArray[modelNode.get('name')] = [];

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
                    group: 'suggestion',
                    referenceFrom: modelNode.get('name')
                });
                count++;

                self.raferenceToArray[modelNode.get('name')].push(model._getRelatedTableName(model.get('referenceTo')));
            }
        }
    });
    network.redraw();
};

GraphExplorer.prototype.collapseNode = function(nodeId) {
    if(!checkSuggestionOnCanvas()){
        var options = {
            physics: {
                enabled: true
            }
        };
        network.setOptions(options);
    }

    delete nodes._data[nodeId].suggestionOpen;

    nodes.remove(this.raferenceToArray[nodeId]);
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
        getNodeGroup(self.inputDataClone);
    });
    return outputData;
};


module.exports = GraphExplorer;