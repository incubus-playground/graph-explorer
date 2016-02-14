/**
 * Created by valeriy.abornyev on 9/23/2015.
 */

    Backbone = require('backbone');
    _ = require('underscore');
    var GroupModel = require('./GroupModel'),
        ElementModel = require('./ElementModel');

    var ElementsCollection = Backbone.Collection.extend({
        model: function(attrs, options) {
            if (attrs.group) {
                return new GroupModel({
                    name: attrs.group.name,
                    elements: new ElementsCollection(attrs.group.elements)
                });
            } else if(attrs.element){
                return new ElementModel(attrs.element, options);
            } else {
                throw 'error';
            }
        },

        initialize: function(config, options) {
            this.url = options && options.url;
        },

        parse: function(response) {
            return response.elements;
        },

        generateVisModel: function () {
            var self = this;
            var nameModel;
            self.model = {
                nodes: [],
                edges: []
            };

            var list = this;
            do {
                list.each(function(model) {
                    if(model.id !== undefined) {
                        setValues(model);
                        list = model.get('elements');
                        self.getModel = model;
                    } else {
                        self.getModel = undefined;
                    }
                })
            } while (self.getModel !== undefined);

            function setValues(model) {
                if(model.get('elements')) {
                    nameModel = model.get('name');
                    self.model.nodes.push({id: model.get('name'), label: model.get('name')});
                    model.get('elements').each(function(item){
                        if(item.get('referenceTo') !== undefined && !_.contains(list, item._getRelatedTableName(item.get('referenceTo')))) {
                            self.model.edges.push({from: nameModel, to: item._getRelatedTableName(item.get('referenceTo')), arrows:'to'});
                        }
                    });
                }
            }
            return self.model;
        },

        findCollection: function(nameModel) {
            var self = this;
            self.modelOfCollection;

            function checkCollection(collection) {
                collection.each(function(model) {
                    if(model.id == nameModel) {
                        return self.modelOfCollection = model;
                    } else if(model.get('elements') !== undefined) {
                        checkCollection(model.get('elements'));
                    }
                    return self.modelOfCollection
                });
            }

            checkCollection(self);
            return self.modelOfCollection
        }
    });

    module.exports =  ElementsCollection;
