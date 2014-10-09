module.exports = function(router, esClient, ejs) {

    router.get('/propects', function(req, res) {

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
            type: 'propects',
            body: body
        }, function (error, response) {
            return res.json(response);
        });

    });


  router.get('/prospects/:id', function(req, res) {
    return res.json({ message: 'Retrieves a specific prospect id: ' + req.params.id });
  });

  router.post('/prospects', function(req, res) {
    return res.json({ message: 'Creates a new prospect' });
  });

  router.put('/prospects/:id', function(req, res) {
    return res.json({ message: 'Updates prospect id: ' + req.params.id });
  });

  router.patch('/prospects/:id', function(req, res) {
    return res.json({ message: 'Partially updates prospect id: ' + req.params.id });
  });

  router.delete('/prospects/:id', function(req, res) {
    return res.json({ message: 'Deletes prospect id: ' + req.params.id });
  });
};
