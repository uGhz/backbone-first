/**
 * http://usejsdoc.org/
 */
var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Mustache = require('mustache');


	var ViafLinksCollection =  require('./collections/ViafLinksCollection.js');
	
	var ViafFormView = require('./views/ViafFormView.js');
	var ViafLinksView = require('./views/ViafLinksView.js');
	var WikidataPersonView = require('./views/WikidataPersonView.js');
	
	
	// Lancement de l'application
	var links = new ViafLinksCollection();
	
	var linksView = new ViafLinksView({
		el : '#viaf-links-container',
		collection : links
	});
	
	var viafFormView = new ViafFormView({
		el : '#viaf-id-form',
		collection: links
	});
	
	var WikidataPersonModel = require('./models/WikidataPersonModel.js');
	var wikidataPerson = new WikidataPersonModel();

	
	var wikidataPersonView = new WikidataPersonView({
		el : '#wikidata-person-container',
		model : wikidataPerson
	});
	
	console.log("Application has started...");
	
	
	
	links.fetch();
	wikidataPerson.fetch();