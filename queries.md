# Queries

## Count all records

### SQL

    SELECT COUNT(*) FROM emails;

### Elasticsearch

    curl 'http://localhost:9200/enron/_count?pretty'


## Search for text in a single field

### SQL

    SELECT COUNT(*) FROM emails WHERE MATCH(subject) AGAINST('monetary');

### Elasticsearch

    curl 'http://localhost:9200/enron/_count?pretty&q=subject:monetary'


## Search for text in multiple fields

### SQL

    SELECT COUNT(*) from emails WHERE MATCH (subject) AGAINST ('monetary') OR MATCH(body) AGAINST ('monetary');

### Elasticsearch

    curl 'http://localhost:9200/enron/_count?pretty&q=subject:monetary+body:monetary'


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
