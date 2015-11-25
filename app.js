
var gitHubApi = require('./modules/github-api.js');

gitHubApi.getCommits(function (data) {
	console.log(data);
});