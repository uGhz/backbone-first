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
	
	console.log("Application has started...");
	
	
	
	links.fetch();