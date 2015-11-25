
module.exports = (function () {
	var restCall = require('./rest-call.js');
	var obj = {};

	obj.getCommits = function (callback) {
		restCall.get('https://api.github.com/repos/nazhrenn/KitchenSurprise/commits?since=' + new Date(2012, 01, 03, 8, 30).toISOString(), null, callback);
	};

	return obj;
}());