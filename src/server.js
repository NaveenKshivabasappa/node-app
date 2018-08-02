var async = require('async');
// var cassandra = require(global.__base + '/db/cassandra.js')
var config = require(global.__base + 'config.js');
var MongoDB = require(global.__base + '/db/mongodb.js');
// var Redis = require(global.__base + '/db/redis.js');
var cluster = require('cluster');
var bunyan = require('bunyan');
var log, mongodb, redis;
var verticals = config.verticals || ['flights', 'trains', 'hotels'];

var ota_switches = {}
var nodeId = 0;
if(cluster.isWorker) {
	nodeId = cluster.worker.id;
}

var Server = function(temp_log) {
	log = temp_log;
	mongodb = new MongoDB(log);
	// redis = new Redis(log);
}

Server.prototype.init = function(callback) {
	var self = this;

	async.parallel([function(cb) {
		mongodb.init(cb)
	}], function(err, data) {
		if(err) {
			callback(err);
		} else {
			callback(null);
		}
	});
}

Server.prototype.faviconHandler = function(req, res, next) {
	if(req.url === '/favicon.ico') {
		res.status(200).send();
	} else {
		next()
	}
}

Server.prototype.domainRestrict = function(req, res, next) {
	//Allowed Domains
	var origin = req.headers.origin;
	if(config.isProduction){
		if(config.allowedDomains.indexOf(origin) >= 0){
			res.header('Access-Control-Allow-Origin', origin);
			res.header('Access-Control-Allow-Credentials', 'true');
		}
	} else {
		res.header('Access-Control-Allow-Origin', origin);
		res.header('Access-Control-Allow-Credentials', 'true');
	}
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,auth');
	next();
}

Server.prototype.dataLoader = function(req, res, next) {
	var self = this;
	req.log = log.child({clientId: (req.query.deviceIdentifier || 'Unknown'),
						remoteIp: req.headers['x-real-ip'],
						clientIp: req.headers['x-forwarded-for'],
						route: req.baseUrl + req.path});


	req.startTime = new Date();
	req.itemCollection = mongodb.fetchItemCollection();
	next();
}

module.exports = Server;