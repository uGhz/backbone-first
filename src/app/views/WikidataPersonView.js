/**
 * http://usejsdoc.org/
 */

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Mustache = require('mustache');

module.exports =  Backbone.View.extend({
		
			initialize: function() {
				console.log("WikidataPersonView INITIALIZE");

				this.template = $('#person-card-template').html();
				this.model.on('change', this.updateView, this);
			},
			
			updateView: function () {
			    // console.log('sync');
			    this.render();
			},
			
			render: function(){
				console.log("WikidataPersonView RENDER");
				console.log("WikidataPersonView RENDER");
				
				var renderData = {
						cardLogoUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Wikidata-logo-without-paddings.svg',
						cardTitle: 'Wikidata',
						imageUrl: this.model.get('illustrationUrl'),
						title: '',
						subtitle: '',
						description: ''
				};
				console.log(renderData);
				
				var renderMarkup = Mustache.render(this.template, renderData);
				console.log("Ready to update DOM.");
				
				this.$el.html(renderMarkup);
				console.log("DOM updated.");
				return this;
			}
		});