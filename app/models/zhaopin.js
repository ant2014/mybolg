var mongoose = require('mongoose');
var ZhaoPinSchema = require("../schemas/zhaopin.js")
var ZhaoPin = mongoose.model('ZhaoPin',ZhaoPinSchema);

module.exports = ZhaoPin;