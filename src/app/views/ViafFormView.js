/**
 * http://usejsdoc.org/
 */
var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');


module.exports = Backbone.View.extend({
		events: {
			'click button.submit': 'viafIdSubmitted'
		},
		
		viafIdSubmitted: function (e) {
			console.log("viafIdSubmitted.");
			var viafId = this.$("#viaf-id").val();
			console.log(this.$("#viaf-id").val());
			this.collection.viafId = viafId;
			this.collection.fetch();
			e.preventDefault();
		}
	});