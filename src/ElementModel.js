/**
 * Created by valeriy.abornyev on 9/23/2015.
 */

Backbone = require('backbone');

var ElementModel = Backbone.Model.extend({
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

module.exports = ElementModel;
