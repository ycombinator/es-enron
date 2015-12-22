//
// Usage: parse_email_files.js -h
//

var opts = require('commander'),
	walk = require('walk'),
	fs = require('fs'),
	path = require('path'),
	md5 = require('md5'),
	MailParser = require("mailparser").MailParser;

opts
	.option('-s --source-dir [path]', 'Path to Enron emails base directory')
	.option('-d --destination-dir [path]', 'Path to store parsed files', './dataset')
	.parse(process.argv)

var srcDir = opts['sourceDir'],
	destDir = opts['destinationDir'];
if (!srcDir || !destDir) {
	opts.outputHelp();
	process.exit(1);
}

// Walk path looking for email files
var walker = walk.walk(srcDir),
	filePath,
	seen = {};

walker.on('file', function(root, fileStats, next) {
	var filePath = path.join(root, fileStats.name);

	// Read file contents off disk
	fs.readFile(filePath, function(err, data) {

		var mailParser = new MailParser();

		// Write parsed email to Elasticsearch (unless its a duplicate)
		mailParser.on('end', function(mail) {

			// De-dupe
			var signature = md5(mail.from[0].address + mail.subject + mail.date.getTime());
			if (!seen[signature]) {
				seen[signature] = true;
				fs.writeFile(path.join(destDir, signature + '.json'), JSON.stringify(mail));
			}
		})

		// Parse file contents as EML format
		mailParser.write(data);
		mailParser.end();
		next();
	})
});
