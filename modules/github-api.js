
module.exports = (function () {
	var restCall = require('./rest-call.js');
	var obj = {};
	
	var gitHubApiUrl = "https://api.github.com/";
	
	var makeGitHubUrl = function (path) {
		return gitHubApiUrl + path;
	};

	obj.getCommits = function (user, repo, sinceDate, callback) {
		restCall.get(makeGitHubUrl('repos/' + user + '/' + repo + '/commits' + (sinceDate !== null ? '?since=' + sinceDate.toISOString() : '')), null, callback);
	};
	
	obj.getUserRepos = function (user, callback) {
		restCall.get(makeGitHubUrl('/users/' + user + '/repos'), null, callback);
	};
	
	obj.getOrganizationRepos = function (org, callback) {
		restCall.get(makeGitHubUrl('/orgs/' + org + '/repos'), null, callback);
	};

	return obj;
}());