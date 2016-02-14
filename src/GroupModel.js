/**
 * Created by valeriy.abornyev on 9/23/2015.
 */
    Backbone = require('backbone');

    var GroupModel = Backbone.Model.extend({
        defaults: {
            name: undefined,
            elements: undefined,
            isOnCanvas: false
        },

        idAttribute: 'name'
    });

module.exports = GroupModel;