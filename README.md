## Preparation

The `dataset.tgz` file contains an archive of all Enron emails, de-duped, and
parsed into JSON files. Each JSON file in the archive represents one email message.

The size of this compressed dataset is 252MB. Uncompressed into individual JSON files,
the size becomes 1.3GB.

1. Uncompress the archive.

    tar xvf dataset.tgz

2. Load the emails into Elasticsearch.

    npm install   # if you haven't run this already
    node load_into_es.js

3. Load the emails in MySQL.

    node load_into_mysql.js

## Appendix

The original Enron email dataset was taken from https://www.cs.cmu.edu/~./enron/.
This is a set of files in EML format, where each file represents one email message.
Some of these messages are duplicated.

The `parse_email_files.js` script will parse the original Enron email dataset into
JSON files, after de-duplicating them.

The included `dataset.tgz` file is archive of exactly these JSON files.
