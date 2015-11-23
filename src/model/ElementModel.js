/**
 * Created by valeriy.abornyev on 9/23/2015.
 */

define(function (require) {
    var Backbone = require('backbone'),
        _ = require('underscore');

    return Backbone.Model.extend({
        defaults: {
            isIdentifier: undefined,
            name: undefined,
            type: undefined,
            referenceTo: undefined
        },

        _getRelatedTableName: function (item) {
            return item.substring(item.indexOf('.') + 1, item.lastIndexOf('.'));
        }
    });
});