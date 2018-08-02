"use strict";
var status_codes = require("./status_codes");

exports.respondAndLog = function(req, res, status_code, data, extra){

	status_code = typeof status_code !== 'undefined' ? status_code : status_codes.FAILURE;
	data = typeof data !== 'undefined' ? data : {};
	extra = typeof extra !== 'undefined' ? extra : {};
	extra = extra !== null ? extra : {};
	extra.requestId = req.requestId;
	let return_dict = {
		'message': status_code.message,
		'code': status_code.status,
		'body': data,
		'extra': extra
	};

	res.json(return_dict);
	let log_data = req.log_data || {};
	let lat = req.query.lat;
	let long = req.query.long;

	log_data.bodyParams = JSON.stringify(req.body || {});
	if(req.path !== "/available/"){log_data.queryParams = JSON.stringify(req.query || {});}
	log_data.code = status_code.status;
	log_data.timeTaken = new Date() - req.startTime;
	if(req.p && req.p.page && (req.p.page === 0) && req.dbStart){
		log_data.db_time = req.dbEnd - req.dbStart;
		log_data.after_db = new Date() - req.dbEnd;
	}
	log_data.ips = JSON.stringify(req.ips || {});
	if((lat !== undefined) && (long !== undefined)){log_data.deviceLocation = [parseFloat(long), parseFloat(lat)];}
	req.log.info(log_data, "Responding for : ");
};

exports.respondAndLog = function(req,res,status_code,data,extra){

    status_code = typeof status_code !== 'undefined' ? status_code : status_codes.FAILURE;
    data = typeof data !== 'undefined' ? data : {};
    extra = typeof extra !== 'undefined' ? extra : {};
    extra = extra != null ? extra : {};
    extra.requestId = req.requestId;
    var return_dict = {
        'message': status_code.message,
        'code': status_code.status,
        'body': data,
        'extra': extra
    };
    res.json(return_dict);
    var data = req.log_data || {};
    var lat = req.query.lat;
    var long = req.query.long;

    data.bodyParams = JSON.stringify(req.body || {});
    if(req.path != "/available/")data.queryParams = JSON.stringify(req.query || {});
    data.code = status_code.status;
    data.timeTaken = new Date - req.startTime;
    if(req.p && req.p.page && (req.p.page == 0) && req.dbStart){
        data.db_time = req.dbEnd - req.dbStart;
        data.after_db = new Date - req.dbEnd;
    }
    data.ips = JSON.stringify(req.ips || {});
    if((lat != undefined) && (long != undefined))data.deviceLocation = [parseFloat(long),parseFloat(lat)];
    req.log.info(data,"Responding for : ");
};