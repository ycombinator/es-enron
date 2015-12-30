//
// Usage: node transform_for_mysql_bulk_load.js -h
//

var opts = require('commander'),
	fs = require('fs'),
	path = require('path'),
	json2csv = require('json2csv');

opts
	.option('-s --source-dir [path]', 'Path to directory containing Enron emails JSON files', './dataset')
	.parse(process.argv)

var sourceDir = opts.sourceDir;

// Helper functions
var emailArrayToList = function(emailArray) {
	if (emailArray) {
		return emailArray.map(function(email) {
			return email.address;
		}).join(',');
	} else {
		return '';
	}
}

fs.readdir(sourceDir, function(err, files) {
	if (err) { console.error(err); process.exit(2); }

	var filePath, data, json, numFilesProcessed = 0, totalNumFiles = files.length;

	for (var i = 0; i < files.length; ++i) {
		file = files[i];
		filePath = path.join(sourceDir, file);
		data = fs.readFileSync(filePath);
		json = JSON.parse(data);
		json2csv({
			data: json,
			fields: [
				{
					value: function(row) {
						return emailArrayToList(row.from);
					}
				},
				{
					value: function(row) {
						return emailArrayToList(row.to);
					}
				},
				{
					value: function(row) {
						return emailArrayToList(row.cc);
					}
				},
				{
					value: function(row) {
						return emailArrayToList(row.bcc);
					}
				},
				{
					value: 'subject'
				},
				{
					value: 'text'
				}
			],
			del: "\t",
			hasCSVColumnTitle: false
		}, function(err, csv) {
			console.log(csv);
		});
	} // END for
}); // fs.readdir
