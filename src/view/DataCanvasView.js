/**
 * Created by Artem.Malieiev on 7/13/2015.
 */
define(function (require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        _ = require('underscore'),
        vis = require('vis'),
        ElementsCollection = require('collection/ElementsCollection'),
        generateVisModel = require('utils/generateVisModel');

    return Backbone.View.extend({

        className: 'data-canvas-view',
        events: {
            'dragover': 'onDragOver',
            'drop': 'onDrop'
        },

        initialize: function (options) {
            this._subviews = [];
            var nodes, edges;
            this.selectedModels = new Backbone.Collection();


            this.listenTo(Tamanoir, 'dragstart:sidebarGroup', this.onSidebarGroupDragstart);
            this.listenTo(Tamanoir, 'dragstart:sidebarConnection', this.onSidebarConnectionDragstart);
            this.listenTo(this.collection, 'update reset', this.render);

            setTimeout(function () {this.render();}.bind(this), 100);//TODO: find solution how to remove this hook
        },

        render: function () {
            var settings = {
                nodes: [],
                edges: []
            };
            var self = this;
            var status = false;
            var raferenceToArray = [];


            if(this.selected !== undefined) {
                settings = this.selectedModels.generateVisModel();
                //var even = this.collection.find(function (model) {
                //    return model.get('id') == 'customers';
                //});
            }

            if(settings !== undefined) {
                nodes = new vis.DataSet(settings.nodes);
                edges = new vis.DataSet(settings.edges);

                var data = {
                    nodes: nodes,
                    edges: edges
                };
            }

            var   options = {
                nodes: {
                    shape: 'image',
                    size: 20,
                    scaling: {
                        min: 10,
                        max: 30,
                        label: {
                            min: 8,
                            max: 30
                        }
                    },
                    image: 'img/node.svg'
                },
                edges: {
                    width: 0.15,
                    arrows: {
                        from:   {enabled: false, scaleFactor:1}
                    },
                    color: {
                        inherit: 'to'
                    },
                    smooth: {
                        enabled: false,
                        type: 'continuous'
                    },
                    physics: false,
                    length: 100
                },
                physics: {
                    enabled: true,
                    stabilization: {
                        enabled: true,
                        iterations: 100
                    }
                },
                interaction: {
                    tooltipDelay: 200
                },
                groups: {
                    icons: {
                        shape: 'image',
                        image: 'img/node-suggestion.svg'
                    },
                    suggestion: {
                        shape: 'image',
                        image: 'img/suggestion.svg',
                        color: {background:'#CCCCCC',border:'#CCCCCC'}
                    }
                }
            };

            this.calculateHeight();

            setTimeout(function() {
                self.network = new vis.Network(self.el, data);
                self.network.setOptions(options);
                self.network.on('click', function (params) {
                    //self.clickNode(params);
                    params.event = "[original event]";
                    console.log(JSON.stringify(params, null, 4));
                    var nodeName = params.nodes[0];
                    var nodePosition = self.network.getPositions(nodeName);

                    self.selectedModels.forEach(function(item) {
                        if(item.id === nodeName) {
                            if(params.nodes.length > 0) {
                                if(
                                    (nodePosition[nodeName].x + 13) < params.pointer.canvas.x &&
                                    (nodePosition[nodeName].x + 22) > params.pointer.canvas.x &&
                                    (nodePosition[nodeName].y - 20) < params.pointer.canvas.y &&
                                    (nodePosition[nodeName].y - 10) > params.pointer.canvas.y
                                ){ if(!status) {
                                    //console.log(self.elements);
                                    item.get('elements').each(function(model) {
                                        if(model.get('referenceTo') !== undefined ) {
                                            if(!nodes._data[model._getRelatedTableName(model.get('referenceTo'))]) {
                                                nodes.add({id: model._getRelatedTableName(model.get('referenceTo')), label: model._getRelatedTableName(model.get('referenceTo')), group: 'suggestion'});
                                                raferenceToArray.push(model._getRelatedTableName(model.get('referenceTo')));
                                            }

                                        }
                                    });
                                    status = true;
                                } else {
                                    nodes.remove(raferenceToArray);
                                    raferenceToArray = [];
                                    status = false;
                                }


                                }
                            }
                        } else if(nodeName !== undefined && nodes._data[nodeName].group == 'suggestion') {
                            self.collectedModels(nodeName);
                            console.log(nodePosition[nodeName].x);
                            console.log(nodePosition[nodeName].y);

                            nodes.remove(raferenceToArray);
                            raferenceToArray = [];
                            status = false;

                            self.selectedModels.each(function(item){
                                if(item.id === nodeName) {
                                    console.log(item);
                                    self.addNodeFromSuggested(item, nodePosition[nodeName].x, nodePosition[nodeName].y);
                                }
                            });
                        }
                    });



                });
                self.network.on("dragEnd", function (params) {
                    params.event = "[original event]";
                    //console.log( JSON.stringify(params, null, 4));
                });
            },0);

            return this;
        },
        addNodeFromSuggested: function(model, x , y) {
            var self = this;
            this.referenceTo = false;

            model.get('elements').each(function(item) {
                if(item.get('referenceTo') !== undefined) {
                    edges.add({from: model.get('name'), to: item._getRelatedTableName(item.get('referenceTo')), arrows:'to'});
                    self.referenceTo = true;
                }
            });

            if(this.referenceTo) {
                nodes.add({id: model.get('name'), label: model.get('name'), x: x, y: y, group: 'icons'});
            } else {
                nodes.add({id: model.get('name'), label: model.get('name'), x: x, y: y, group: ''});
            }
        },

        clickNode: function(param) {

            var model = this.collection.get(param.nodes[0]);
            console.log(this.collection);

            //if(model) {
            //    var view = new RightSidebarView({model: model});
            //    $('.right-sidebar-container').html(view.render().$el);
            //}
        },

        onDragOver: function (event) {
            event.preventDefault();
        },

        onDrop: function (event) {
            this.position = this.network.DOMtoCanvas({x: event.originalEvent.layerX, y: event.originalEvent.layerY});
            var self = this;
            var nodeName = this.draggedGroupModel.get('name');
            this.elements = this.draggedGroupModel.get('elements');
            this.referenceTo = false;

            this.elements.each(function(item) {
                if(item.get('referenceTo') !== undefined) {
                    edges.add({from: self.draggedGroupModel.get('name'), to: item._getRelatedTableName(item.get('referenceTo')), arrows:'to'});
                    self.referenceTo = true;
                }
            });

            if(this.referenceTo) {
                nodes.add({id: nodeName, label: nodeName, x: this.position.x, y: this.position.y, group: 'icons'});
            } else {
                nodes.add({id: nodeName, label: nodeName, x: this.position.x, y: this.position.y, group: ''});
            }



            //setTimeout(function() {
            //    var nodePosition = self.network.getPositions(nodeName);
            //    console.log(nodePosition[nodeName]);
            //    var context = self.network.canvas.frame.canvas.getContext('2d');
            //    context.fillStyle = "red";

                //context.fillRect(0, 0, 150, 150);
                //var pos = self.network.DOMtoCanvas({x: nodePosition[nodeName].x, y: nodePosition[nodeName].y});
                //console.log(pos.x);
                //console.log(pos.y);
                //
                //context.fillRect(self.position.x, self.position.y, 150, 150);
                //
                //console.log(self.position.x);
                //console.log(self.position.y);
            //}, 0);
            window.network = this.network;
        },

        onSidebarGroupDragstart: function (group) {
            console.log('dragstart', group);
            this.draggedGroupModel = group;
            this.draggedGroupModel.set('isOnCanvas', true);
            this.selectedModels.add(group);
        },

        onSidebarConnectionDragstart: function (tablesCollection) {
            console.log('dragstart:sidebarConnection');
            this.draggedTablesCollection = tablesCollection;
            this.draggedTableModel = null;
        },

        remove: function () {
            _.invoke(this._subviews, 'remove');
            Backbone.View.prototype.remove.call(this);
        },

        calculateHeight: function () {
            var self = this;

            setTimeout(function () {
                var bodyHeight = $('body').height(),
                    header = self.$('.domain-designer-header'),
                    contentHeight = bodyHeight - header.height();

                self.$el.height(contentHeight);
            }, 0);
        },
        collectedModels: function(modelName) {
            var self = this;

            function pushModel(collection) {

                collection.each(function(item) {
                    if(item.id === modelName) {
                        self.selectedModels.add(item);

                    } else if(item.get('elements')) {
                        pushModel(item.get('elements'));

                    }
                });

            }

            pushModel(this.collection)

        }
    });
});

