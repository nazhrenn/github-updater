
module.exports = (function () {
	var https = require('https'),
		http = require('http'),
		url = require('url');
	var obj = {};
	
	var defaultOptions = {
		req: {
			port: 80,
			method: 'GET',
			headers: {
				'user-agent': 'NodeJS - Rest Call'
			}
		},
		responseIsJson: true,
		encoding: 'UTF-8',
		data: null
	};

	var makeCall = function (reqUrl, options, callback, setupMethod) {
		var optionObj = {};
		
		if (callback === null && options !== null && typeof options === 'function') {
			callback = options;
			optionObj = defaultOptions;
			// parse options from url and use defaults
		} else if (typeof options === 'function' && options !== null) {
			optionObj = options();
		} else if (options !== null) {
			optionObj = options;
		} else {
			optionObj = defaultOptions;
		}
		
		var urlObject = url.parse(reqUrl);
		
		optionObj.req = {
			host: urlObject.hostname,
			port: urlObject.port,
			path: urlObject.path,
			headers: {
				'user-agent': 'NodeJS - Rest Call'
			}
		};
		
		if (optionObj.responseIsJson === undefined || optionObj.responseIsJson === null) {
			optionObj.responseIsJson = defaultOptions.responseIsJson;
		}
		
		if (optionObj.encoding === undefined || optionObj.encoding === null) {
			optionObj.encoding = defaultOptions.encoding;
		}

		setupMethod(optionObj);

		var reqMethod;
		if (urlObject.protocol === "https:") {
			reqMethod = https.request;
			if (optionObj.req.port === null) {
				optionObj.req.port = 443;
			}
		} else {
			reqMethod = http.request;
			if (optionObj.req.port === null) {
				optionObj.req.port = 80;
			}
		}

		// do the GET request
		var req = reqMethod(optionObj.req, function (res) {
			console.log("statusCode: ", res.statusCode);
			// uncomment it for header details
			//  console.log("headers: ", res.headers);
			var chunks = [];
			res.on('data', function (chunk) {
				console.info("GET Chunk #" + chunks.length);
				chunks.push(new Buffer(chunk).toString('ascii'));
			});
			
			res.on('end', function () {
				var resData = chunks.join('');
				if (optionObj.responseIsJson) {
					resData = JSON.parse(resData);
				}
				callback(resData);
			})
		});
		
		if (optionObj.req.method === 'POST') {
			req.write(optionObj.data);
		}
		
		req.end();
		req.on('error', function (e) {
			console.error(e);
		});
	}

	obj.get = function (reqUrl, options, callback) {
		makeCall(reqUrl, options, callback, function (optionObj) {
			optionObj.req.method = 'GET';
		});
	};
	
	obj.post = function (url, data, options, callback) {
		makeCall(reqUrl, options, callback, function (optionObj) {
			optionObj.req.method = 'POST';
			optionObj.data = data;
			
			optionObj.req.headers['Content-Type'] = 'application/json';
			optionObj.req.headers['Content-Length'] = Buffer.byteLength(jsonObject, 'utf8');
		});
	};

	return obj;
}());