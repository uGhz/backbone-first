/**
 * http://usejsdoc.org/
 */
var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

	module.exports = Backbone.Model.extend({
		
		urlRoot: 'http://127.0.0.1:80/api-draft/public/wikidata/biographies/',
		
		initialize: function (){
			console.log("WikidataPersonModel INITIALIZE");
			console.log(this.id);
		},
		url: function() {
			console.log("WikidataPersonModel URL");
			return this.urlRoot + this.id;
		},
		parse: function(data) {

			console.log("WikidataPersonModel PARSE");
			console.log(data);
			console.log(this.id);
			
        	var result = {
        			denomination: '',
        			description: '',
        			illustrationUrl: '',
        			dateNaissance: null,
        			dateDeces: null,
        			lieuNaissance: null,
        			lieuDeces: null,
        			occupations: null,
        			nationalite: null,
        			wikimediaCommonsCategory: null
        			
        	};

        	var node = data;
        	var claimsNode = null;
        	// var node = null;
        	if (node.hasOwnProperty("results")) {
        	    node = node.results;
        	    if (node.hasOwnProperty("bindings")) {
        	    	node = node.bindings;
        	    	if (node.length) {
	        	    	node = node[0];
	        	    	
		        		result.denomination	= this.getPropertyValue(node.itemLabel);
		        		result.description	= this.getPropertyValue(node.itemDescription);
		        		
		        		var illustration = this.getPropertyValue(node.illustration);
		        		// console.log("illustration : " + illustration);
		        		result.illustrationUrl = illustration;
		        		
		        		result.dateNaissance 	= this.getPropertyValue(node.dateNaissance);
		        		result.dateDeces 		= this.getPropertyValue(node.dateDeces);
		        		result.lieuNaissance 	= this.getPropertyValue(node.lieuNaissanceLabel);
		        		result.lieuDeces	 	= this.getPropertyValue(node.lieuDecesLabel);
		        		result.occupations	 	= this.getPropertyValue(node.occupations);
		        		result.nationalite	 	= this.getPropertyValue(node.nationaliteLabel);
		        		result.wikimediaCommonsCategory = this.getPropertyValue(node.wikimediaCommonsCategory);
		        	}
        		
        	    }
        	}
			
			
			console.log(result);
			return result;
		 },

		 getPropertyValue: function(propertyObject) {
			 	var node = propertyObject;
			 	if (!node || !node.hasOwnProperty("value")) {
			 		return null;
			 	}
			 	
				if (node.hasOwnProperty("datatype")) {
					var dataType = node.datatype;
					if (dataType.indexOf("dateTime") != -1) {
						return new Date(node.value);
					}
				}
				
				var rawValue = node.value;
				if (rawValue.indexOf("|") != -1) {
					return rawValue.split("|");
				}
				
				return rawValue;
				
		 }
		
	});