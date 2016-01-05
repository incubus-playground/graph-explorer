/**
 * Created by valeriy.abornyev on 12/24/2015.
 */

var Backbone = require('backbone'),
    _ = require('underscore'),
    $ = require('jquery'),
    SuggestionItemViewTemplate = require('./templates/SuggestionItemViewTemplate.html');

var SuggestionItemView = Backbone.View.extend({
    tagName: "li",
    className: "suggestion-item-view",
    template: _.template(SuggestionItemViewTemplate),
    events: {
        'click .suggestion-item': 'selectSuggestion'
    },

    initialize: function(){
        //this.listenTo(this.model, 'change', this.render);
    },

    render: function() {
        this.$el.html(this.template({referenceTo: this.model._getRelatedTableName(this.model.get('referenceTo'))}));
        return this;
    },
    selectSuggestion: function() {
        var $input = this.$('.suggestion-item');

        if($input[0].checked){
            $($input).parent().addClass('selected-item');
            //this.selectedSuggestions.push($input.val());
            this.model.trigger('setInputValue', $input.val());
            //console.log($input.val());
        } else {
            $($input).parent().removeClass('selected-item');
            this.model.trigger('removeInputValue', $input.val());
        }
        //console.log(this.selectedSuggestions);
    }
});

module.exports =  SuggestionItemView;