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
    sender       VARCHAR(255) NOT NULL,
    recipients   TEXT,
    cc           TEXT,
    bcc          TEXT,
    subject      VARCHAR(1024),
    body         MEDIUMTEXT,
    datetime     DATETIME
  )
EOF

# CREATE INDEXes
cat <<EOF | mysql -uroot enron
  CREATE INDEX emails_sender ON emails(sender)
EOF

cat <<EOF | mysql -uroot enron
  CREATE FULLTEXT INDEX emails_subject ON emails(subject)
EOF

cat <<EOF | mysql -uroot enron
  CREATE FULLTEXT INDEX emails_body ON emails(body)
EOF

# Transform dataset
node transform_for_mysql_bulk_load.js > /tmp/emails.csv

# Load dataset and time it
time mysqlimport --fields-enclosed-by='"' -uroot enron -L /tmp/emails.csv

# Cleanup
rm /tmp/emails.csv
