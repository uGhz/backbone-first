/**
 * http://usejsdoc.org/
 */
/*
Wikidata Properties

Label
Description
P18 : Illustration (Nom de fichier)
P106 : Occupation
P27 : country of citizenship
P19 : place of birth
P20 : place of death
P569 : date of birth
P570 : date of death
 */
var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

	module.exports = Backbone.Model.extend({
		
		urlRoot: 'http://127.0.0.1:80/biography-enrichment/proxy.php?source=wikidata-entity&wikidata-id=',
		// urlRoot: 'http://172.22.100.140/biography-enrichment/proxy.php?source=wikidata-entity&wikidata-id=',
		initialize: function (){
			console.log("WikidataPersonModel INITIALIZE");
			// this.wikidataId = 'Q294181';
			this.wikidataId = 'Q263387';
		},
		url: function() {
			console.log("WikidataPersonModel URL");
			return this.urlRoot + this.wikidataId;
		},
		parse: function(data) {

			console.log("WikidataPersonModel PARSE");
			console.log(data);
			console.log(this.wikidataId);
			
        	var result = {
        			denomination: '',
        			description: '',
        			illustrationUrl: '',
        			dateNaissance: null,
        			dateDeces: null,
        			lieuNaissance: null,
        			lieuDeces: null,
        			occupation: null,
        			nationalite: null
        			
        	};

        	var node = data;
        	var claimsNode = null;
        	// var node = null;
        	if (node.hasOwnProperty("success")) {
        	      	
        		result.denomination	= this.getEntityLabel(node);
        		result.description	= this.getEntityDescription(node);
        		
        		var claims = this.getClaimsNode(node);
        		var tempValue = null;
        		if (claims) {
        			tempValue = this.getPropertyValue("P18", claims);
        			if (tempValue) {
						result.illustrationUrl = "https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/" +
													tempValue.replace(" ", "_") +
													"&width=300";
        			}
        			result.dateNaissance 	= this.getPropertyValue("P569", claims);
        			result.dateDeces 		= this.getPropertyValue("P570", claims);
//        			result.lieuNaissance 	= this.getPropertyValue("P19", claims);
//        			result.lieuDeces	 	= this.getPropertyValue("P20", claims);
//        			result.occupation	 	= this.getPropertyValue("P106", claims);
//        			result.nationalite	 	= this.getPropertyValue("P27", claims);
        		}
        		

        	}
			
			
			console.log(result);
			return result;
		 },
		 getEntityLabel: function (entityData) {
			 var node = entityData;
			 var result = null;

	        	if (node.hasOwnProperty("entities")) {
	        		node = node.entities;
	        		if (node.hasOwnProperty(this.wikidataId)) {
	        			node = node[this.wikidataId];
	        			if (node.hasOwnProperty("labels")) {
	        				node = node.labels;
	        				if (Object.keys(node).length > 0) {
	        					var languageKey = '';
	        					if (node.hasOwnProperty("fr")) {
	        						languageKey = 'fr';
	        					} else if (node.hasOwnProperty("en")) {
	        						languageKey = 'en';
								} else {
									languageKey = Object.keys(node)[0];
								}
	        					// console.log(node);
	        					node = node[languageKey];
	        					if (node.hasOwnProperty("value")) {
	        						result = node.value;
	        					}
	        				}
	        			}
	        		}
	        	}
	        return result;
		 },
		 getEntityDescription: function (entityData) {
			 var node = entityData;
			 var result = null;

	        	if (node.hasOwnProperty("entities")) {
	        		node = node.entities;
	        		if (node.hasOwnProperty(this.wikidataId)) {
	        			node = node[this.wikidataId];
	        			if (node.hasOwnProperty("descriptions")) {
	        				node = node.descriptions;
	        				if (Object.keys(node).length > 0) {
	        					var languageKey = '';
	        					if (node.hasOwnProperty("fr")) {
	        						languageKey = 'fr';
	        					} else if (node.hasOwnProperty("en")) {
	        						languageKey = 'en';
								} else {
									languageKey = Object.keys(node)[0];
								}
	        					// console.log(node);
	        					node = node[languageKey];
	        					if (node.hasOwnProperty("value")) {
	        						result = node.value;
	        					}
	        				}
	        			}
	        		}
	        	}
	        return result;
		 },
		 getClaimsNode: function(entityData) {
			 var node = entityData;
			 var result = null;

	        	if (node.hasOwnProperty("entities")) {
	        		node = node.entities;
	        		if (node.hasOwnProperty(this.wikidataId)) {
	        			node = node[this.wikidataId];
	        			if (node.hasOwnProperty("claims")) {
	        				result = node.claims;
	        			}
	        		}
	        	}
	        return result;
		 },
		 getPropertyValue: function(propertyName, claimsNode) {
			 	var node = claimsNode;
			 	var result = null;
				if (node.hasOwnProperty(propertyName)) {
					node = node[propertyName][0];
					if (node.hasOwnProperty("mainsnak")) {
						node = node.mainsnak;
    					if (node.hasOwnProperty("datavalue")) {
    						node = node.datavalue;
    						switch(node.type) {
	    						case "string":
	            					if (node.hasOwnProperty("value")) {
	            						result =  node.value;
	            					}
	    							break;
	    						case "time":
	            					if (node.hasOwnProperty("value")) {
	            						result =  new Date(node.value.time.substring(1));
	            					}
	    							break;
	    						case "wikibase-entityid":
	    							// TODO. La récupération des valeurs sous forme d'entité nécessite
	    							// une requête supplémentaire à l'API Wikidata.
	            					if (node.hasOwnProperty("value")) {
	            						result =  node.value;
	            					}
	    							break
    						}
    					}
					}
				}
				return result;
		 }
		
	});