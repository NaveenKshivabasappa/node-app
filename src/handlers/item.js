"use strict";
var util = require('util');
var ObjectID = require('mongodb').ObjectID;
var misc_utils = require(global.__base + 'common/misc_utils');
var status_codes = require(global.__base + 'common/status_codes');
var response_utils = require(global.__base + 'common/response_utils');

var storeItem = function(req, res, next) {
	if(!req.body || !req.body.name || req.body.name == "" || !req.body.cost || req.body.cost == ""){
		req.log.info("no item details");
        var err = misc_utils.create_error("No item details found", status_codes.REQUIRED_PARAMETER_MISSING);
        return next(err);
	}else{
		var data = {};
		data.name = req.body.name;
		data.cost = req.body.cost;
		req.itemCollection.insert(data,function(err,records){
			if(err){
				return next(err);
			}else{
				response_utils.respondAndLog(req, res, status_codes.SUCCESS, {}, {});
			}
		})
	}
}

var getItem = function(req, res, next) {
	// console.log(req.body);
	var fetch_item_query = {}
	if(req.query && req.query.id && req.query.id == ""){
		fetch_item_query._id = new ObjectID(req.query.id)
	}
	req.itemCollection.find(fetch_item_query).toArray(function (err, docs) {
		if(err){
			return next(err);
		}else{
			response_utils.respondAndLog(req, res, status_codes.SUCCESS, docs, {});
		}
	})
}

var removeItem = function(req, res, next) {
	var fetch_item_query = {}
	if(!req.query || !req.query.id || req.body.id == ""){
		var err = misc_utils.create_error("No item details found", status_codes.REQUIRED_PARAMETER_MISSING);
		return next(err);
	}else{
		fetch_item_query._id = new ObjectID(req.query.id)
		req.itemCollection.remove(fetch_item_query,function (err, obj) {
			if(err){
				return next(err);
			}else{
				response_utils.respondAndLog(req, res, status_codes.SUCCESS, {}, {});
			}
		})
	}
}

var updateItem = function(req, res, next) {
	var update_item_query = {}
	if(!req.body || !req.body.id || req.body.id == ""){
		var err = misc_utils.create_error("No item details found", status_codes.REQUIRED_PARAMETER_MISSING);
		return next(err);
	}else{
		update_item_query._id = new ObjectID(req.body.id)
		var update_data_set = {}
		if(req.body.name && req.body.name!= ""){
			update_data_set.name = req.body.name;
		}
		if(req.body.cost && req.body.cost!= ""){
			update_data_set.cost = req.body.cost;
		}
		var update_data = {};
		update_data["$set"] = update_data_set;
		req.itemCollection.update(update_item_query,update_data,function (err, obj) {
			if(err){
				return next(err);
			}else{
				response_utils.respondAndLog(req, res, status_codes.SUCCESS, {}, {});
			}
		})
	}
}

exports.storeItem = storeItem;
exports.getItem = getItem;
exports.removeItem = removeItem;
exports.updateItem = updateItem;
