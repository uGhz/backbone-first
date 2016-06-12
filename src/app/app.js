/**
 * http://usejsdoc.org/
 */
var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Mustache = require('mustache');


$('img').fadeIn(); // makes images disappear


	var ViafLinksCollection = Backbone.Collection.extend({
		urlRoot: 'http://viaf.org/viaf',
		url: function() {
			// return this.urlRoot + '/' + this.id + '/justlinks.json';
			// return this.urlRoot + '/96994048/justlinks.json';
			return 'http://127.0.0.1:80/biography-enrichment/proxy.php?source=viaf-links&viaf-id=96994048';
		},
		parse: function(data) {
			var result = [];
			for (var key in data) {
				result.push({'key' : key, 'value' : data[key]});
			}
		    return result;
		 }
	});

	var ViafLinkModel = Backbone.Model.extend({
		
	});

	var ViafLinksView =  Backbone.View.extend({
			el: $('#viaf-links-container'),
		
			initialize: function() {
				// this.template = _.template($('#viaf-links-template').html());
				this.template = Mustache.parse($('#viaf-links-template').html());
				this.listenTo(this.model, 'change', this.render);
			},

//			render: function(){
//				// this.$el.html(this.template(this.model.attributes));
//				this.el.html(Mustache.render(this.template, this.model.attributes));
//				
//			}
			
			render: function(){
				this.collection.each(function(person){
			            console.log(person);
				});
			}
		});
	
    var AppView = Backbone.View.extend({
      el: $('#container'),
      // template which has the placeholder 'who' to be substitute later
      template: _.template("<h2>Hello <%= who %></h2>"),
      initialize: function(){
        this.render();
      },
      render: function(){
        // render the function using substituting the varible 'who' for 'world!'.
        this.$el.html(this.template({who: 'world!'}));
        //***Try putting your name instead of world.
      }
    });


var appView = new AppView();

var links = new ViafLinksCollection();
links.fetch({
	   dataType: 'json',
	   success : function (data) {
	     console.log(data);
	   } 
	 });

var linksView = new ViafLinksView();
linksView.collection = links;
linksView.render();
console.log("Application has started...");