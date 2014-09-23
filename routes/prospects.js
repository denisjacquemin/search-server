module.exports = function(router, esClient, ejs) {

  router.get('/prospects', function(req, res) {
    return res.json({ message: 'Retrieves a list of prospects' });
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
