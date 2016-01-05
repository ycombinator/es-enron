#!/bin/bash

# Delete index
curl -XDELETE 'http://localhost:9200/enron' 2>/dev/null >&2

# Create index
curl -XPOST 'http://localhost:9200/enron' -d'
{
  "mappings": {
    "email": {
      "properties": {
        "sender": { "type": "string", "index": "not_analyzed" },
        "recipients": { "type": "string", "index": "not_analyzed" },
        "cc": { "type": "string", "index": "not_analyzed" },
        "bcc": { "type": "string", "index": "not_analyzed" },
        "subject": { "type": "string", "analyzer": "english" },
        "body": { "type": "string", "analyzer": "english" }
      }
    }
  }
}
' 2>/dev/null >&2

# Load dataset
time node --max-old-space-size=4096 load_into_elasticsearch.js --source-dir dataset/
