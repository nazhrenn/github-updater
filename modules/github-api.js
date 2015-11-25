
module.exports = (function () {
	var restCall = require('./rest-call.js');
	var obj = {};
	
	var gitHubApiUrl = "https://api.github.com/";

	obj.getCommits = function (user, repo, sinceDate, callback) {
		restCall.get(gitHubApiUrl + 'repos/' + user + '/' + repo + '/commits' + (sinceDate !== null ? '?since=' + sinceDate.toISOString() : ''), null, callback);
	};

	return obj;
}());