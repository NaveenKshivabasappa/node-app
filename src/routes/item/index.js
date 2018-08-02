"use strict";
var express = require('express');
var router = express.Router();

var item = require(global.__base + '/handlers/item.js');
var error = require(global.__base + 'common/error');
var status_codes = require(global.__base + 'common/status_codes');

router.get('/inventory', item.getItem, error);
router.post('/inventory', item.storeItem, error);
router.delete('/inventory', item.removeItem, error);
router.put('/inventory', item.updateItem, error);

module.exports = router;