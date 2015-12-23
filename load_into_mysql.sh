#!/bin/bash

# DROP DATABASE
cat <<EOF | mysql -uroot
	DROP DATABASE IF EXISTS enron
EOF

# CREATE DATABASE
cat <<EOF | mysql -uroot
	CREATE DATABASE enron
EOF

# CREATE TABLE
cat <<EOF | mysql -uroot enron
	CREATE TABLE IF NOT EXISTS emails (
		sender	     VARCHAR(255) NOT NULL,
		recipients   TEXT,
		cc           TEXT,
		bcc          TEXT,
		subject      VARCHAR(1024),
		body         MEDIUMTEXT,
		datetime     DATETIME
	)
EOF

# Load dataset
node --max-old-space-size=4096 load_into_mysql.js --source-dir dataset/
