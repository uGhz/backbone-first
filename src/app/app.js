/**
 * http://usejsdoc.org/
 */
var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Mustache = require('mustache');


	var ViafLinksCollection = Backbone.Collection.extend({
		urlRoot: 'http://viaf.org/viaf',
		url: function() {
			// return this.urlRoot + '/' + this.id + '/justlinks.json';
			// return this.urlRoot + '/96994048/justlinks.json';			
			return 'http://127.0.0.1:80/biography-enrichment/proxy.php?source=viaf-links&viaf-id=96994048';
			// return 'http://172.22.100.140/biography-enrichment/proxy.php?source=viaf-links&viaf-id=96994048';
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
				this.setElement('#viaf-links-container');
				var rawTemplate = $('#viaf-links-template').html();
				// console.log(rawTemplate);
				// this.template = Mustache.parse(rawTemplate);
				this.template = rawTemplate;
				// this.collection.on('add', this.render, this);
				
				this.collection.on('sync', this.updateView, this);
				
				// this.listenTo(this.model, 'change', this.render);
			},
			
			updateView: function () {
			    console.log('sync');
			    this.render();
			},
			
			render: function(){
				console.log("ViafLinksView RENDER");
				
				// var renderData = {"viaf-links" : JSON.parse(JSON.stringify(this.collection)};
				var renderData = {
                        title: 'VIAF',
                        subtitle: 'Autorités en tous genres',
                        iconName: 'student',
						links: JSON.parse(JSON.stringify(this.collection))
				};
				console.log(renderData);
				var renderMarkup = Mustache.render(this.template, renderData);
				console.log("Ready to update DOM.");
				
				this.$el.html(renderMarkup);
				console.log("DOM updated.");
				return this;
			}
		});
	
var links = new ViafLinksCollection();
links.fetch({
	   dataType: 'json',
	   success : function (data) {
	     console.log(data);
	   } 
	 });

var linksView = new ViafLinksView({"collection" : links});

console.log("Application has started...");