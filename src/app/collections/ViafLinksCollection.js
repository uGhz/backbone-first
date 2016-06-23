/**
 * http://usejsdoc.org/
 */
var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

	module.exports = Backbone.Collection.extend({
		urlRoot: 'http://127.0.0.1:80/api-draft/public/viaf/authority/',

		initialize: function () {
			this.viafId = '96994048';
		},
		url: function() {
			return this.urlRoot + this.viafId + '/links';
		},
		parse: function(data) {
			var result = [];
			for (var key in data) {
				result.push({'key' : key, 'value' : data[key]});
			}
		    return result;
		 }
	});