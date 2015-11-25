var fs = require('fs');
var exec = require('child_process').exec;
var gitHubApi = require('./modules/github-api.js');
var argv = require('minimist')(process.argv.slice(2));

var filePath = __dirname + '/repoData.json';

var command = null;
if (argv.command) {
	command = argv.command;
}

if (argv.file) {
	filePath = argv.file;
}

var data = {};

try {
	var stats = fs.lstatSync(filePath);
	
	if (stats.isFile()) {
		data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
	}
} catch (e) {

}

var user = argv.user;
var repo = argv.repo;

if (!!data[user] && !!data[user][repo]) {
	// check if the data is up to date.
	var lastCheckDate = new Date(data[user][repo].lastDate);
	gitHubApi.getCommits(user, repo, lastCheckDate, function (resData) {
		processData(resData);
	});
} else {
	// do the update first time
	gitHubApi.getCommits(user, repo, null, function (resData) {
		processData(resData);
	});
}

function processData(resData) {
	if (!data[user]) {
		data[user] = {};
	}
	if (!data[user][repo]) {
		data[user][repo] = {
			totalCommits : 0
		};
	}
	if (resData.length > 0) {
		// there were commits, run update command
		if (command === null && !!data[user][repo].lastCommand) {
			command = data[user][repo].lastCommand;
		}
		if (command !== null) {
			exec(command, function (error, stdout, stderr) {
				if (!!error) {
					console.log(stderr);
				} else {
					console.log(stdout);
				}
				updateDataFile(resData.length);
			});
		}
	}
}

function updateDataFile(commitCount) {
	data[user][repo].lastCommand = command;
	data[user][repo].lastDate = new Date();
	data[user][repo].totalCommits += commitCount;
	
	fs.writeFileSync(filePath, JSON.stringify(data));
}