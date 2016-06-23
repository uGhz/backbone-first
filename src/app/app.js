/**
 * http://usejsdoc.org/
 */
var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Mustache = require('mustache');

	var WikidataPersonModel = require('./models/WikidataPersonModel.js');
	
	var ViafLinksCollection =  require('./collections/ViafLinksCollection.js');
	var WikimediaCommonsImagesCollection = require('./collections/WikimediaCommonsImagesCollection.js');
	
	var ViafFormView = require('./views/ViafFormView.js');
	var ViafLinksView = require('./views/ViafLinksView.js');
	var WikimediaCommonsImagesView = require('./views/WikimediaCommonsImagesView.js');
	var WikidataPersonView = require('./views/WikidataPersonView.js');

	
	/*
	 * Instanciation des composants de l'application
	 */ 
	var links = new ViafLinksCollection();
	
	var linksView = new ViafLinksView({
		el : '#viaf-links-container',
		collection : links
	});
	
	var viafFormView = new ViafFormView({
		el : '#viaf-id-form',
		collection: links
	});
	
	var wikidataPerson = new WikidataPersonModel({
		// id : 'Q294181'
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
	
	/*
	 * Définition des gestionnaires d'évènements
	 */ 
	wikidataPerson.on('change', function () {
		console.log('EVENT TRIGGERED : wikidataPerson on change');
		// wikimediaImagesCollection.set('currentCategory', this.wikimediaCommonsCategory);
		console.log('this.wikimediaCommonsCategory : ' + this.get('wikimediaCommonsCategory'));
		wikimediaImagesCollection.currentCategory = this.get('wikimediaCommonsCategory');
		wikimediaImagesCollection.fetch();
	}, wikidataPerson);
	
	links.on('sync', function () {
		console.log('EVENT TRIGGERED : linksView on sync');
		var wikidataLink = this.findWhere({"key" : "WKP"});
		console.log('this.findWhere({"key" : "WKP"} : ' + wikidataLink);
		
		var wikidataId = wikidataLink.get('value');
		console.log('wikidataId : ' + wikidataId);
		
		if (wikidataId) {
			wikidataPerson.id = wikidataId;
			wikidataPerson.fetch();
		}
		
	}, links);
	
	console.log("Application has started...");
	
	/*
	 * Exécution de l'application
	 */ 
	links.fetch();
	wikidataPerson.fetch();
	
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
	
	

	