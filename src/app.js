global.__base = __dirname + '/';

var config = require(global.__base + 'config.js');
var bunyan = require('bunyan');
var express = require('express');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var http = require('http');
var cluster = require('cluster');
var compression = require('compression');

var Server = require(global.__base + 'server.js');

var port = (process.env.PORT || '3001');
var num_cpus = require('os').cpus().length;
var clusterid = 0;
var log;


if(cluster.isWorker) {
	clusterid = cluster.worker.id;
}

if(config.isProduction) {
	log = bunyan.createLogger({name: 'nodeapp', clusterid: clusterid});
} else {
	log = bunyan.createLogger({name: 'nodeapp', level: 'debug', clusterid: clusterid});
}
var server = new Server(log);

server.init(function(err, data) {
	if(err) {
		throw err;
	} else {
		var routes = require(global.__base + 'routes/index.js');
		var app = express();
		app.use(compression());
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({ extended: true }));
		//app.use(expressValidator());
		app.use(server.faviconHandler);
		app.use(server.domainRestrict);
		app.use(server.dataLoader);
		app.set('port', port);
		app.use('/', routes);

		var travel_server = http.createServer(app);

		if (cluster.isMaster) {
			for (var i = 0; i < num_cpus; i++) {
				cluster.fork();
			}

			cluster.on('exit', function(worker, code, signal) {
				var new_worker = cluster.fork();
				log.error('worker ' + worker.process.pid + ' died');
				log.warn('worker ' + new_worker.process.pid + ' born');
			});
		} else {
			travel_server.listen(port);
			travel_server.on('listening', function() {
				var addr = travel_server.address();
				var bind = typeof addr === 'string'? 'pipe ' + addr : 'port ' + addr.port;
				log.info('Express server listening on port ' + bind + ' clusterid: ' + clusterid);
			});
		}
	}
});

process.on('uncaughtException', function(err) {
	log.error('Something broke!!! - ' + err.stack);
});
