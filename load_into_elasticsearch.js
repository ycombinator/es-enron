var opts = require('commander'),
	elasticsearch = require('elasticsearch'),
	fs = require('fs'),
	path = require('path'),
	moment = require('moment');
opts
	.option('-s --source-dir [path]', 'Path to directory containing Enron emails JSON files', './dataset')
	.parse(process.argv)

var sourceDir = opts.sourceDir;

// Helper functions
var emailArrayToList = function(emailArray) {
	if (emailArray) {
		return emailArray.map(function(email) {
			return email.address;
		});
	} else {
		return '';
	}
}

var client = new elasticsearch.Client({
	requestTimeout: 4 * 60 * 60 * 1000
});

// Populate index
fs.readdir(sourceDir, function(err, files) {
	if (err) { console.error(err); process.exit(2); }

	var filePath, data, json, numFilesProcessed = 0, totalNumFiles = files.length;
	var bulkLines = [];

	for (var i = 0; i < files.length; ++i) {
		file = files[i];
		filePath = path.join(sourceDir, file);
		data = fs.readFileSync(filePath);
		json = JSON.parse(data);

		bulkLines.push({
			index: {}
		});
		bulkLines.push({
			sender: emailArrayToList(json.from),
			recipients: emailArrayToList(json.to),
			cc: emailArrayToList(json.cc),
			bcc: emailArrayToList(json.bcc),
			subject: json.subject,
			body: json.text,
			datetime: json.date
		});

		if ((i % 22000) === 0) {
			client.bulk({
				body: bulkLines,
				index: 'enron',
				type: 'email'
			}, function(err, resp) {
			});
			bulkLines = [];
		}
	} // END for
	client.bulk({
		body: bulkLines,
		index: 'enron',
		type: 'email'
	}, function(err, resp) {
	});
}); // fs.readdir
