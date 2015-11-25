
var gitHubApi = require('./modules/github-api.js');

gitHubApi.getCommits('nazhrenn', 'KitchenSurprise', new Date(2015, 01, 01), function (data) {
	console.log(data);
});