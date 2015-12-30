## With default mappings

### Index the documents

curl -XPUT 'http://localhost:9200/cities/city/1' -d'
{
  "city": "Sandusky",
  "population": 25340
}
'

curl -XPUT 'http://localhost:9200/cities/city/2' -d'
{
  "city": "New Albany",
  "population": 8829
}
'

curl -XPUT 'http://localhost:9200/cities/city/3' -d'
{
  "city": "New York",
  "population": 8406000
} 
'

### Query
curl -XPOST 'http://localhost:9200/cities/_search' -d'
{
  "query": {
    "match": {
      "city": "New Albany"
    }
  }
}
'


## With `not_analyzed` mapping

### Cleanup
curl -XDELETE 'http://localhost:9200/cities'

### Create index with mapping
curl -XPUT 'http://localhost:9200/cities' -d'
{
  "mappings": {
    "city": {
      "properties": {
        "city": {
          "type": "string",
          "index": "not_analyzed"
        }
      }
    }
  }
}
'

### Index the documents

curl -XPUT 'http://localhost:9200/cities/city/1' -d'
{
  "city": "Sandusky",
  "population": 25340
}
'

curl -XPUT 'http://localhost:9200/cities/city/2' -d'
{
  "city": "New Albany",
  "population": 8829
}
'

curl -XPUT 'http://localhost:9200/cities/city/3' -d'
{
  "city": "New York",
  "population": 8406000
} 
'

### Query
curl -XPOST 'http://localhost:9200/cities/_search' -d'
{
  "query": {
    "match": {
      "city": "New Albany"
    }
  }
}
'