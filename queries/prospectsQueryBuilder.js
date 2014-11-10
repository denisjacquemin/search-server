module.exports = function(req, ejs) {

    var location = req.query.location;
    var distance = parseInt(req.query.distance) || 20;
    var lon      = parseInt(req.query.lon);
    var lat      = parseInt(req.query.lat);
//    var roommin  = req.query.roommin || 0 ;
//    var roommax  = req.query.roommax || 100;
    var rooms    = req.query.rooms;
    var pricemin = req.query.pricemin || 0;
    var pricemax = req.query.pricemax || 1000000000;
    var surfacemin = req.query.surfacemin || 0;
    var surfacemax = req.query.surfacemax || 1000000;


    var boolQuery = new ejs.BoolQuery();
    if (rooms != '') {
        var roomsFilters =  rooms.split(',');
        for (var i = 0; i < roomsFilters.length; i++) {
            boolQuery = boolQuery.should(ejs.MatchQuery('bedroomcount', roomsFilters[i]));
        };
        //boolQuery = boolQuery.minimumNumberShouldMatch(0);
    }
    //boolQuery = boolQuery.must(ejs.RangeQuery("budget_min").gte(pricemin).lt(pricemax))
    boolQuery = boolQuery.must(ejs.RangeQuery("surface").gte(surfacemin).lt(surfacemax))


    var body = ejs.Request()
        .query(
        ejs.FilteredQuery(
            boolQuery,
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

    return body;

}