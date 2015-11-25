
module.exports = (function () {
	var restCall = require('./rest-call.js');
	var obj = {};
	
	var gitHubApiUrl = "https://api.github.com";
	
	var makeGitHubUrl = function (path) {
		return gitHubApiUrl + path;
	};

	obj.getCommits = function (user, repo, sinceDate, callback) {
		restCall.get(makeGitHubUrl('/repos/' + user + '/' + repo + '/commits' + (sinceDate !== null ? '?since=' + sinceDate.toISOString() : '')), { responseIsJson: true }, callback);
	};
	
	obj.getUserRepos = function (user, callback) {
		restCall.get(makeGitHubUrl('/users/' + user + '/repos'), { responseIsJson: true }, callback);
	};
	
	obj.getOrganizationRepos = function (org, callback) {
		restCall.get(makeGitHubUrl('/orgs/' + org + '/repos'), { responseIsJson: true }, callback);
	};

	return obj;
}());