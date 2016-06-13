/**
 * http://usejsdoc.org/
 */
var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Mustache = require('mustache');


	var ViafLinksCollection = Backbone.Collection.extend({
		urlRoot: 'http://127.0.0.1:80/biography-enrichment/proxy.php?source=viaf-links&viaf-id=',
		// urlRoot: 'http://172.22.100.140/biography-enrichment/proxy.php?source=viaf-links&viaf-id=',
		initialize: function () {
			this.viafId = '96994048';
		},
		url: function() {
			return this.urlRoot + this.viafId;
		},
		parse: function(data) {
			var result = [];
			for (var key in data) {
				result.push({'key' : key, 'value' : data[key]});
			}
		    return result;
		 }
	});
	
	var ViafFormView =  Backbone.View.extend({
		events: {
			'click button.submit': 'viafIdSubmitted'
		},
		
		viafIdSubmitted: function (e) {
			console.log("viafIdSubmitted.");
			var viafId = this.$("#viaf-id").val();
			console.log(this.$("#viaf-id").val());
			this.collection.viafId = viafId;
			this.collection.fetch();
			e.preventDefault();
		}
	});

	var ViafLinksView =  Backbone.View.extend({
		
			initialize: function() {
				console.log("ViafLinksView INITIALIZE");

				this.template = $('#viaf-links-template').html();
				this.collection.on('sync', this.updateView, this);
			},
			
			updateView: function () {
			    console.log('sync');
			    this.render();
			},
			
			render: function(){
				console.log("ViafLinksView RENDER");
				
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
	
	var linksView = new ViafLinksView({
		el : '#viaf-links-container',
		collection : links
	});
	
	var viafFormView = new ViafFormView({
		el : '#viaf-id-form',
		collection: links
	});
	
	console.log("Application has started...");
	
	
	
	links.fetch({data: {viafId: 'testtest'}});