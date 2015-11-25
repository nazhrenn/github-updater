
var gitHubApi = require('./modules/github-api.js');

gitHubApi.getCommits('nazhrenn', 'KitchenSurprise', new Date(2015, 11, 01), function (data) {
	console.log(data);
});