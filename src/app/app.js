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
	var WikimediaCommonsImagesView = require('./views/WikimediaCommonsImagesView.js');
	var WikidataPersonView = require('./views/WikidataPersonView.js');
	var WikimediaCommonsImagesCollection = require('./collections/WikimediaCommonsImagesCollection.js');
	
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
	var wikidataPerson = new WikidataPersonModel({
		id : 'Q294181'
	});

	
	var wikidataPersonView = new WikidataPersonView({
		el : '#wikidata-person-container',
		model : wikidataPerson
	});
	
	var wikimediaImagesCollection = new WikimediaCommonsImagesCollection({
		
	});
	
	var commonsView = new WikimediaCommonsImagesView({
		el : '#wikimedia-commons-images-container',
		collection : wikimediaImagesCollection
	});
	
	console.log("Application has started...");
	
	
	
	links.fetch();
	wikidataPerson.fetch();
  
	wikimediaImagesCollection.fetch();
	
	/*
	setTimeout(function() {
		// wikidataPerson.set('id', 'Q33760');
		wikidataPerson.id = 'Q33760';
		wikidataPerson.fetch();
		
		setTimeout(function() {
			// wikidataPerson.set('id', 'Q42');
			wikidataPerson.id = 'Q42';
			wikidataPerson.fetch();
		}, 10000);
	}, 10000);
	*/
	

	