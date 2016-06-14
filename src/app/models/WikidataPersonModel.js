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
			this.wikidataId = 'Q294181';
		},
		url: function() {
			return this.urlRoot + this.wikidataId;
		},
		parse: function(data) {

			console.log("WikidataPersonModel PARSE");
			console.log(data);
			
			
        	var result = {
        			illustrationUrl: ''
        	};

        	var node = data;
        	// var node = null;
//        	if (node.hasOwnProperty("entities")) {
//        		node = node["entities"];
//        		if (node.hasOwnProperty(wikidataId)) {
//        			node = node[wikidataId];
        			if (node.hasOwnProperty("claims")) {
        				node = node.claims;
        				if (node.hasOwnProperty("P18")) {
        					node = node.P18[0];
        					if (node.hasOwnProperty("mainsnak")) {
        						node = node.mainsnak;
            					if (node.hasOwnProperty("datavalue")) {
            						node = node.datavalue;
                					if (node.hasOwnProperty("value")) {
                						result.illustrationUrl = "https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/"
                												+ node.value.replace(" ", "_")
                												+ "&width=300";
                					}
            					}
        					}
        				}
        			}
//        		}
//        	}
			
			
			console.log(result);
			return result;
		 }
	});