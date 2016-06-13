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
			// return 'http://127.0.0.1:80/biography-enrichment/proxy.php?source=viaf-links&viaf-id=96994048';
			return 'http://172.22.100.140/biography-enrichment/proxy.php?source=viaf-links&viaf-id=96994048';
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
		
			initialize: function() {
				console.log("ViafLinksView INITIALIZE");
				this.el = '#viaf-links-container';
				var rawTemplate = $('#viaf-links-template').html();
				console.log(rawTemplate);
				// this.template = Mustache.parse(rawTemplate);
				this.template = rawTemplate;
				this.collection.on('add', this.render, this);
				
				// this.listenTo(this.model, 'change', this.render);
			},
			
			render: function(){
				console.log("ViafLinksView RENDER");
				// console.log(this.collection);
				// console.log(JSON.stringify(this.collection));
				
				/*
				this.collection.each(function(person){
			            console.log(person);
				});
				*/
				console.log(_.isArray(this.template));
				console.log(_.isArray({"viaf-links" : this.collection}));
				
				var renderData = JSON.stringify(this.collection);
				console.log(renderData);
				
				this.$el.html(Mustache.to_html(this.template, renderData));
				
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

var linksView = new ViafLinksView({"collection" : links});

console.log("Application has started...");