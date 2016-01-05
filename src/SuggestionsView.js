/**
 * Created by valeriy.abornyev on 12/24/2015.
 */
var Backbone = require('backbone'),
    _ = require('underscore'),
    $ = require('jquery'),
    SuggestionItemView = require('./SuggestionItemView'),
    SuggestionsViewTemplate = require('./templates/SuggestionsViewTemplate.html');
    require('./css/GraphExplorerStyle.css');

var SuggestionsView = Backbone.View.extend({
    tagName: 'div',
    className: 'network-popUp',
    template: _.template(SuggestionsViewTemplate),
    events: {
        'click .suggestion-item': 'selectSuggestion'
    },

    initialize: function(){
        this.selectedSuggestions = [];
        this.listenTo(this.collection, 'add', this.addItemView);
        this.listenTo(this.collection, 'remove', this.removeItemView);
    },

    buildSuggestions: function(item) {
        console.log(item);
    },

    addItemView: function(item) {
        if(!nodes._data[item._getRelatedTableName(item.get('referenceTo'))]) {
            var view = new SuggestionItemView({ model: item });
            this.$('.suggestion-list').append(view.render().$el);
            this.selectedSuggestions.push(view)
        }
    },

    removeItemView: function() {
        this.selectedSuggestions.forEach(function(view) {
            view.remove();
        });
        this.selectedSuggestions = [];
    },

    render: function() {
        this.$el.html(this.template);
        //this.collection.forEach(this.addItemView, this);
        return this;
    },
    setInputValue: function(val) {
        console.log(val);
    }
});

module.exports =  SuggestionsView;