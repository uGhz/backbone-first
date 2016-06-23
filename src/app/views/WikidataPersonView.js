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
				
				var mentionNaissance = '';
				var tempDate = this.model.get('dateNaissance');
				if (tempDate) {
					mentionNaissance = tempDate.toLocaleDateString();
					if (this.model.get('lieuNaissance')) {
						mentionNaissance += ', à ' + this.model.get('lieuNaissance');
					}
				}
				
				var mentionDeces = '';
				tempDate = this.model.get('dateDeces');
				if (tempDate) {
					mentionDeces = tempDate.toLocaleDateString();
					if (this.model.get('lieuDeces')) {
						mentionDeces += ', à ' + this.model.get('lieuDeces');
					}
				}
				
				var renderData = {
						cardLogoUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Wikidata-logo-without-paddings.svg',
						cardTitle: 'Wikidata',
						imageUrl: this.model.get('illustrationUrl'),
						title: this.model.get('denomination'),
						subtitle: this.model.get('description'),
						description: '',
						mentionNaissance : mentionNaissance,
						mentionDeces : mentionDeces,
						occupations: this.model.get('occupations')
				};
				console.log(renderData);
				
				var renderMarkup = Mustache.render(this.template, renderData);
				console.log("Ready to update DOM.");
				
				this.$el.html(renderMarkup);
				console.log("DOM updated.");
				return this;
			}
		});