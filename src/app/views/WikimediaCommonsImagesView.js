/**
 * http://usejsdoc.org/
 */

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Mustache = require('mustache');

module.exports =  Backbone.View.extend({
		
			initialize: function() {
				console.log("WikimediaCommonsImagesView INITIALIZE");

				this.template = $('#images-cards-template').html();
				this.collection.on('sync', this.updateView, this);
			},
			
			updateView: function () {
			    // console.log('sync');
			    this.render();
			},
			
			render: function(){
				console.log("WikimediaCommonsImagesView RENDER");
				
				var renderData = {
                        title: 'Wikimedia Commons',
                        subtitle: 'Catégorie d\'images',
                        iconName: 'student',
						images: JSON.parse(JSON.stringify(this.collection))
				};
				console.log(renderData);
				
				var renderMarkup = Mustache.render(this.template, renderData);
				console.log("Ready to update DOM.");
				
				this.$el.html(renderMarkup);
				console.log("DOM updated.");
				return this;
			}
		});