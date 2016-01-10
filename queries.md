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

    SELECT subject FROM emails WHERE body LIKE '%monetary fund%';

### Elasticsearch

    curl -XPOST 'http://localhost:9200/enron/_search?pretty&fields=subject' -d'
    {
      "query": {
        "match_phrase": {
          "body": "monetary fund"
        }
      }
    }'

## Show top 10 senders

### SQL

    SELECT sender, COUNT(*) AS num_emails_sent FROM emails GROUP BY sender ORDER BY num_emails_sent DESC LIMIT 10;

### Elasticsearch

    curl -XPOST 'http://localhost:9200/enron/_search?pretty' -d '{
      "size": 0,
      "aggs": {
        "top_10_senders": {
          "terms": {
            "field": "sender"
          }
        }
      }
    }'
