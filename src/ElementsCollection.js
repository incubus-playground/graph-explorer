/**
 * Created by valeriy.abornyev on 9/23/2015.
 */

define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore'),
        GroupModel = require('GroupModel'),
        ElementModel = require('ElementModel');

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

        generateVisModel: function () {
            var self = this;
            var nameModel;
            self.model = {
                nodes: [],
                edges: []
            };

            function setValues(collection) {
                collection.each(function (item) {

                    if(item.get('elements')) {
                        nameModel = item.get('name');
                        self.model.nodes.push({id: item.get('name'), label: item.get('name')});
                        setValues(item.get('elements'));
                    } else  if(item.get('referenceTo') !== undefined && !_.contains(collection, item._getRelatedTableName(item.get('referenceTo')))) {
                        self.model.edges.push({from: nameModel, to: item._getRelatedTableName(item.get('referenceTo')), arrows:'to'});
                    }
                });
                return self.model;
            }

            setValues(self);

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

    return ElementsCollection;
});