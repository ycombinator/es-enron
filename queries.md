# Queries

## Search for text in a single field

### SQL

    SELECT subject FROM emails WHERE MATCH(subject) AGAINST('monetary');

### Elasticsearch

#### Using curl

    curl 'http://localhost:9200/enron/_search?pretty&q=subject:monetary&_source_include=subject'

#### Using Console (fka Sense)

    GET /enron/_search?q=subject:monetary&_source_include=subject

## Search for text in multiple fields

### SQL

    SELECT subject from emails WHERE MATCH (subject) AGAINST ('monetary') OR MATCH(body) AGAINST ('monetary');

### Elasticsearch

#### Using curl

    curl 'http://localhost:9200/enron/_search?pretty&q=subject:monetary+body:monetary&_source_include=subject'

#### Using Console (fka Sense)

    GET /enron/_search?q=subject:monetary+body:monetary&_source_include=subject

## Search for a phrase

### SQL

    SELECT subject FROM emails WHERE body LIKE '%monetary fund%';

### Elasticsearch

#### Using curl

    curl -XPOST 'http://localhost:9200/enron/_search?pretty&_source_include=subject' -d'
    {
      "query": {
        "match_phrase": {
          "body": "monetary fund"
        }
      }
    }'

#### Using Console (fka Sense)

    POST /enron/_search?_source_include=subject
    {
      "query": {
        "match_phrase": {
          "body": "monetary fund"
        }
      }
    }
