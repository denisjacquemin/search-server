module.exports = function(router, esClient, ejs) {

    // Search properties and prospects matching criteria
    router.get('/search', function(req, res) {

        var propertiesQueryBody = require('../queries/propertiesQueryBuilder')(req, ejs);
        var prospectsQueryBody  = require('../queries/prospectsQueryBuilder')(req, ejs);




        esClient.msearch({
            body: [
                { index: 'geotest', type: 'property' },
                propertiesQueryBody,

                { index: 'geotest', type: 'prospect' },
                prospectsQueryBody
            ]
        }, function (error, response) {
            return res.json(response);
        });
    });

};