/**
 * http://usejsdoc.org/
 */
var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

	module.exports = Backbone.Collection.extend({
		
		urlRoot: 'http://127.0.0.1:80/api-draft/public/wikimedia-commons/categories/',
		
		initialize: function (models, options) {
			this.currentCategory = options.category;
		},
		url: function() {
			console.log("WikimediaCommonsImagesCollection URL");
			
			var urlString = this.urlRoot + this.currentCategory + '/images';
			console.log("urlString : " + urlString);
			return urlString;
		},
		parse: function(data) {
			console.log("WikimediaCommonsImagesCollection PARSE");
			console.log(data);
			var results = [];
			
			
			var node = null;
			if (data && data.hasOwnProperty('query')) {
				node = data.query;
				if (node.hasOwnProperty('pages')) {
					node = node.pages;
					var tempImageInfo = null;
					for (var key in node) {
						if (node[key].hasOwnProperty('imageinfo')) {
							if (node[key].imageinfo.length) {
								tempImageInfo = node[key].imageinfo[0];
								if (tempImageInfo) {
									results.push({
										descriptionUrl:	tempImageInfo.descriptionurl,
										imageUrl: 		tempImageInfo.url,
										thumbUrl: 		tempImageInfo.thumburl
									});
								}
							}
						}
					}
				}
			}
			
			console.log(results);
		    return results;
		 }
	});