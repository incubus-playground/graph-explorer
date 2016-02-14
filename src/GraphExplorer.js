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

    $(this.container).css('position', 'relative');

}

GraphExplorer.prototype.buildNodeCanvas = function () {
    var settings = this.settings;
    var self = this;
    var visData;
    var status = false;
    this.statusSuggestion = false;
    this.checkedSuggedstions = [];
    this.nodeName = '';

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

    network.on('click', this.showSuggestionsPopup.bind(this));

    this.suggestionCollection = new Backbone.Collection();
    this.activeView = new SuggestionsView({collection: this.suggestionCollection});
    $(this.container).append(this.activeView.render().$el);

    $('.button-cancel').on('click', this.hideSuggestionsPopup.bind(this));
    $('.button-select').on('click', this.addSuggestionsNodesToCanvas.bind(this));
    this.suggestionCollection.on('setInputValue', this.addNodesToCheckedSuggestions.bind(this));
    this.suggestionCollection.on('removeInputValue', this.removeNodesToCheckedSuggestions.bind(this));
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
            this.suggestionArray = this.getSuggestions(nodeName);
            this.suggestionCollection.add(this.suggestionArray);
            $('.network-popUp').show();
            this.nodeName = nodeName;
            var popupWidth = $('.network-popUp').width();
            var popupHeight = $('.network-popUp').height();
            $('.network-popUp').css({'margin-left': -(popupWidth / 2), 'margin-top': -(popupWidth / 2)});
        }
    }
};

GraphExplorer.prototype.hideSuggestionsPopup = function() {
    this.suggestionCollection.remove(this.suggestionArray);
    $('.network-popUp').hide();
    this.nodeName = '';
};

GraphExplorer.prototype.addSuggestionsNodesToCanvas = function() {
    var self = this;
    var currentAngle = 0.5;

    this.checkedSuggedstions.forEach(function(item) {
        var pos = checkPositions();
        self.showNode(item, pos.x, pos.y);
        delete self.checkedSuggedstions[item];
    });
    this.checkedSuggedstions = [];
    this.hideSuggestionsPopup();

    function checkPositions() {
        var nodeParentPosition = network.getPositions(self.nodeName);
        var nodePosition = {};

        var radius = 100;

        function setPosition() {
            var vx = Math.cos(currentAngle)*radius;
            var vy = Math.sin(currentAngle)*radius;

            nodePosition.x = nodeParentPosition[self.nodeName].x + vx;
            nodePosition.y = nodeParentPosition[self.nodeName].y + vy;

            currentAngle-=0.5;

            if(network.getNodeAt(network.canvasToDOM({x: nodePosition.x, y: nodePosition.y})) !== undefined) {
                currentAngle-=0.5;
                setPosition();
            }
        }

        setPosition();

        return nodePosition;
    }
};

GraphExplorer.prototype.getSuggestions = function(nodeName) {
    var referenceArray = [];
    var model = this.dataCollection.findCollection(nodeName);

    this.elements = model.get('elements');

    this.elements.each(function(item) {
        if(item.get('referenceTo') !== undefined) {
            referenceArray.push(item);
        }
    });
    return referenceArray;
};

GraphExplorer.prototype.addNodesToCheckedSuggestions = function(item) {
    this.checkedSuggedstions.push(item);
};

GraphExplorer.prototype.removeNodesToCheckedSuggestions = function(item) {
    for(var i = 0; i < this.checkedSuggedstions.length; i++) {
        if(this.checkedSuggedstions[i] == item) {
            this.checkedSuggedstions.splice([i], 1);
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

GraphExplorer.prototype.getVisibleDataSet = function() {
    var self = this;
    var outputData = {
        elements: [],
        name: 'outputData'
    };

    $.ajax({
        method: 'get',
        url: this.settings.url,
        success: function (data) {
            self.nodesOnCanvas.forEach(function(nodeId){

                function getNodeGroup(inputData) {
                    inputData.forEach(function(item) {
                        if(!item.element && item.group.name == nodeId) {
                            outputData.elements.push(item);
                        } else if(!item.element && item.group.elements) {
                            getNodeGroup(item.group.elements);
                        }
                    });

                    return outputData;
                }
                getNodeGroup(data.elements);
            });
        }
    });

    return outputData;
};


module.exports = GraphExplorer;