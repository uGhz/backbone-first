/**
 * http://usejsdoc.org/
 */
var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

	module.exports = Backbone.Model.extend({
		
		// urlRoot: 'http://127.0.0.1:80/biography-enrichment/proxy.php?source=viaf-links&viaf-id=',
		urlRoot: 'http://172.22.100.140/biography-enrichment/proxy.php?source=wikidata-entity&wikidata-id=',
		initialize: function (){
			this.wikidataId = 'Q294181';
		},
		url: function() {
			return this.urlRoot + this.wikidataId;
		},
		parse: function(data) {
			
			console.log(data);
			return data;
		 }
	});