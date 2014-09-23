module.exports = function(router, esClient, ejs) {

  router.get('/test', function(req, res) {
      // using elastic.js
      esClient.search({
          index: 'geotest',
          type: 'property',
          body: ejs.Request()
              .query(ejs.MatchQuery('title', 'marche'))
      }, function (error, response) {
          return res.json(response);
      });
  });

  router.get('/properties', function(req, res) {

    // STEP 1 VALIDATION

    var location = req.query.location;
    var distance = parseInt(req.query.distance) || 20;
    var lon      = parseInt(req.query.lon);
    var lat      = parseInt(req.query.lat);
    var roommin  = req.query.roommin || 0 ;
    var roommax  = req.query.roommax || 100;
    var pricemin = req.query.pricemin || 0;
    var pricemax = req.query.pricemax || 1000000000;
    var surfacemin = req.query.surfacemin || 0;
    var surfacemax = req.query.surfacemax || 1000000;


      var body = ejs.Request()
        .query(
            ejs.FilteredQuery(
                ejs.BoolQuery()
                    .must(ejs.RangeQuery("bedroomcount").gte(roommin).lt(roommax))
                    .must(ejs.RangeQuery("price").gte(pricemin).lt(pricemax))
                    .must(ejs.RangeQuery("surface").gte(surfacemin).lt(surfacemax)),
                ejs.GeoDistanceFilter("location")
                  .distance(distance)
                  .point(ejs.GeoPoint([lat, lon]))
            )
        ).aggregation(
            ejs.RangeAggregation('price_ranges').field('price')
                .range(null, 100000)
                .range(100000, 150000)
                .range(150000, 200000)
                .range(200000, 250000)
                .range(250000, 300000)
                .range(300000, null)
        ).aggregation(
            ejs.RangeAggregation('bedroomscount_ranges').field('bedroomcount')
                .range(null, 2)
                .range(2, 3)
                .range(3, 4)
                .range(4, 5)
                .range(5, null)
        ).aggregation(
          ejs.RangeAggregation('surface_ranges').field('surface')
              .range(null, 50)
              .range(50, 100)
              .range(100, 150)
              .range(150, 200)
              .range(200, 250)
              .range(250, null)
        );

      esClient.search({
          index: 'geotest',
          type: 'property',
          body: body
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

