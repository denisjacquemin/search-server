// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');
var cors       = require("cors");

var elasticsearch = require('elasticsearch');
var ejs           = require("elastic.js");


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var port = process.env.PORT || 8080; 		// set our port

// INIT ElasticSearch connection



var esHost = process.env.BONSAI_URL || 'localhost:9200';
var esLogLEvel = process.env.ELASTICSEARCH_LOG_LEVEL || 'trace';
var esApiVersion = process.env.ELASTICSEARCH_API_VERSION || '1.2';
var esKeepAlive = process.env.ELASTICSEARCH_KEEP_ALIVE || true;



var esClient = new elasticsearch.Client({
    host: esHost,
    log: esLogLEvel,
    apiVersion: esApiVersion,
    keepAlive: esKeepAlive
});



// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router

// import properties's routes
require('./routes/properties')(router, esClient, ejs);

// import prospects's routes
require('./routes/prospects')(router);

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);