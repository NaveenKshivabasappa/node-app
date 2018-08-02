var config = require(global.__base + '/config.js');
var mongo = require('mongodb');

var MongoDB = function(log) {
	this.log = log || console;
	var index = 0;
	this.connection_string = "mongodb://";
	if(config.db.mongodb.username && config.db.mongodb.username!= "" && config.db.mongodb.password && config.db.mongodb.password!= ""){
		this.connection_string += config.db.mongodb.username+":"+config.db.mongodb.password+"@";
	}
	for(index = 0; index < config.db.mongodb.servers.length; ++index) {
		this.connection_string += config.db.mongodb.servers[index].host 
						+ ":" + config.db.mongodb.servers[index].port;
		this.connection_string += ',';
	}
	this.connection_string = this.connection_string.slice(0, -1);
	this.connection_string += '/';

	this.connection_string += config.db.mongodb.db_name + '?replicaSet=' + config.db.mongodb.replica_set;
	if(config.db.mongodb.authSource && config.db.mongodb.authSource!= "" ){
		this.connection_string += "&authSource="+config.db.mongodb.authSource;
	}	
	console.log(this.connection_string)
};

MongoDB.prototype.init = function(callback) {
	var self = this;
	var MongoClient = mongo.MongoClient;

	MongoClient.connect(this.connection_string,config.db.mongodb.db_options, function(err, client){
	  if(err){
		self.log.error({error: err}, 'Error occurred while connecting to mongodb');
		console.log(err)
		callback(err);
	  }else{
	    self.log.info('Successfully connected to mongodb');
	    self.client = client;
	    callback(null);
	  }
	});
}

MongoDB.prototype.fetchItemCollection = function(callback) {
	// console.log(this.db)
	var db = this.client.db("test")
	return db.collection("item");
}

module.exports = MongoDB;
