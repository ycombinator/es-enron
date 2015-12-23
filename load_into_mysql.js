var opts = require('commander'),
	mysql = require('mysql'),
	fs = require('fs'),
	path = require('path'),
	moment = require('moment'),
	ProgressBar = require('progress');

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

var connection = mysql.createConnection({
	host: '127.0.0.1',
	user: 'root',
	database: 'enron'
});
connection.connect();

// Populate table
fs.readdir(sourceDir, function(err, files) {
	if (err) { console.error(err); process.exit(2); }

	var filePath, data, json, numFilesProcessed = 0, totalNumFiles = files.length;
	var bar = new ProgressBar('loading [:bar] :percent :elapseds elapsed :etas remaining', { total: totalNumFiles, width: 100 });

	var done = function() {
		bar.tick();
		if (bar.complete) {
			console.log('\nDone!\n');
			process.exit();
		}
	};

	files.forEach(function(file) {
		filePath = path.join(sourceDir, file);
		data = fs.readFileSync(filePath);
		json = JSON.parse(data);

		connection.query('INSERT INTO emails VALUES (?, ?, ?, ?, ?, ?, ?)', [
			emailArrayToList(json.from),
			emailArrayToList(json.to),
			emailArrayToList(json.cc),
			emailArrayToList(json.bcc),
			json.subject,
			json.text,
			moment(json.date).format('YYYY-MM-DD HH:mm:ss')
		], function(err) {
			if (err) { console.log(filePath); console.error(err); process.exit(6); }
			done();
		});
	}); // END files.forEach
}); // fs.readdir
