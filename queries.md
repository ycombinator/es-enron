# Queries

## Search for text in a single field

### SQL

    SELECT subject FROM emails WHERE MATCH(subject) AGAINST('monetary');

### Elasticsearch

#### Using curl

    curl 'http://localhost:9200/enron/_search?pretty&q=subject:monetary&fields=subject'

#### Using Console (fka Sense)

    GET /enron/_search?q=subject:monetary&fields=subject

## Search for text in multiple fields

### SQL

    SELECT subject from emails WHERE MATCH (subject) AGAINST ('monetary') OR MATCH(body) AGAINST ('monetary');

### Elasticsearch

#### Using curl

    curl 'http://localhost:9200/enron/_search?pretty&q=subject:monetary+body:monetary&fields=subject'

#### Using Console (fka Sense)

    GET /enron/_search?q=subject:monetary+body:monetary&fields=subject

## Search for a phrase

### SQL

    SELECT subject FROM emails WHERE body LIKE '%monetary fund%';

### Elasticsearch

#### Using curl

    curl -XPOST 'http://localhost:9200/enron/_search?pretty&fields=subject' -d'
    {
      "query": {
        "match_phrase": {
          "body": "monetary fund"
        }
      }
    }'

#### Using Console (fka Sense)

    POST /enron/_search
    {
      "query": {
        "match_phrase": {
          "body": "monetary fund"
        }
      },
      "fields": [
        "subject"
      ]
    }
