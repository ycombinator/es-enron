# Queries

## Search for text in a single field

### SQL

    SELECT subject FROM emails WHERE MATCH(subject) AGAINST('monetary');

### Elasticsearch

    curl 'http://localhost:9200/enron/_search?pretty&q=subject:monetary&fields=subject'

## Search for text in multiple fields

### SQL

    SELECT subject from emails WHERE MATCH (subject) AGAINST ('monetary') OR MATCH(body) AGAINST ('monetary');

### Elasticsearch

    curl 'http://localhost:9200/enron/_search?pretty&q=subject:monetary+body:monetary&fields=subject'


## Search for a phrase

### SQL

    SELECT COUNT(*) FROM emails WHERE body LIKE '%monetary fund%';

### Elasticsearch

    curl -XPOST 'http://localhost:9200/enron/_count?pretty' -d'
    {
      "query": {
        "match_phrase": {
          "body": "monetary fund"
        }
      }
    }'
