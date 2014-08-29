module.exports = function(router, esClient) {

  router.get('/properties', function(req, res) {
    esClient.search({
            index: 'hub',
            type: 'property',
            body: {
                query: {
                    match: {
                        address: 'marloie'
                    }
                }
            }
        }).then(function (body) {
            var hits = body.hits.hits;
            return res.json(hits);
        }, function (error) {
            console.trace(error.message);
            return res.json(error);
        });
  });

  router.get('/properties/:id', function(req, res) {
    return res.json({ message: 'Retrieves a specific property id: ' + req.params.id });
  });

  router.post('/properties', function(req, res) {
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

