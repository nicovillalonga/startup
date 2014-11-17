define(['jquery', 'underscore', 'backbone', 'models/movie'/*, 'text!templates/movie.html'*/],
       function($, _, Backbone, Movie){
            var MovieView = Backbone.View.extend({
                 template: _.template('<b><button id="remove">X</button> <b><button id="edit">Edit</button> <%= title %></b>'),//template for normal display
                 editTemplate: _.template('<input class="name" value="<%= name %>" /><button id="save">Save</button>'),//template for edit mode
                 events: {
                     "click #remove": "deleteItem",
                     "click #edit": "editItem",
                     "click #save": "saveItem",
                 },

                 deleteItem: function () {
                     this.model.destroy();
                     this.remove();
                 },

                 editItem: function () {
                     this.$el.html(this.editTemplate(this.model.toJSON()));
                 },

                 saveItem: function () {
                     
                     editTitle = $('input.name').val();
                     this.model.save({
                         title: editTitle
                     });
                     this.$el.html(this.template(this.model.toJSON()));
                 },
                initialize: function(){
                    var movie = new Movie();
                    this.render();
                },
                 render: function () {                     
                     var attributes = this.model.toJSON();
                     this.$el.empty().append(this.template(attributes));
                     return this;
                 }
             });
    return MovieView;
});