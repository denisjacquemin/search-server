module.exports = function(router, esClient, ejs) {

  router.get('/properties', function(req, res) {

      var propertiesQueryBody  = require('../queries/propertiesQueryBuilder')(req, ejs);

      esClient.search({
          index: 'geotest',
          type: 'property',
          body: propertiesQueryBody
      }, function (error, response) {
          return res.json(response);
      });




    // STEP 2 SEARCH - CALL to ElasticSearch

//    esClient.search({
//            index: 'geotest',
//            type: 'property',
//            body: {
//                "query": {
//                    "and": [
//                        {
//                            "range": {
//                                "bedroomcount": {
//                                    "gte": roommin,
//                                    "lte": roommax - 1
//                                }
//                            }
//                        },
//                        {
//                        "range" : {
//                            "price": {
//                                "gte": pricemin,
//                                "lte": pricemax
//                            }
//                        }
//                      }
//                    ]
//                },
//                "filter": {
//
//
//                            "geo_distance" : {
//                              "distance" : distance,
//                              "location" : {
//                                "lat" : lat,
//                                "lon" : lon
//                              }
//                            }
//
//                },
//                "aggregations" : {
//                    "price_ranges" : {
//                        "range" : {
//                            "field" : "price",
//                            "ranges" : [
//                                { "to" : 100000 },
//                                { "from" : 100000, "to" : 150000 },
//                                { "from" : 150000, "to" : 200000 },
//                                { "from" : 200000, "to" : 250000 },
//                                { "from" : 250000 }
//                            ]
//                        }
//                    },
//                    "bedroomscount_ranges" : {
//                        "range" : {
//                            "field" : "bedroomcount",
//                            "ranges" : [
//                                { "to" : 2 },
//                                { "from" : 2, "to" : 3 },
//                                { "from" : 3, "to" : 4 },
//                                { "from" : 4, "to" : 5 },
//                                { "from" : 5, "to" : 6 },
//                                { "from" : 6 }
//                            ]
//                        }
//                    }
//                }
//            }
//        }).then(function (body) {
//            return res.json(body);
//        }, function (error) {
//            console.trace(error.message);
//            return res.json(error);
//        });


    // STEP 3 Format response

    // STEP 4 Send response to client


  });

  router.get('/properties/:id', function(req, res) {



      return res.json({ message: 'Retrieves a specific property id: ' + req.params.id });
  });

  router.post('/properties', function(req, res) {

      esClient.create({
          index: 'geotest',
          type: 'property',
          body: {
              title: 'Un titre',
              description: 'Une description',
              bedroomcount: '100'
          }
      });

      return res.json({ message: 'Creates a new property' });
  });

  router.put('/properties/:id', function(req, res) {
    return res.json({ message: 'Updates property id: ' + req.params.id });
  });

  router.patch('/properties/:id', function(req, res) {
    return res.json({ message: 'Partially updates property id: ' + req.params.id });
  });

  router.delete('/properties/:id', function(req, res) {
    return res.json({ message: 'Deletes property id: ' + req.params.id });
  });
};

