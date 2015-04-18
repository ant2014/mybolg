var mongoose = require('mongoose');
var LifeCateSchema = require("../schemas/lifeCate.js")
var LifeCate = mongoose.model('LifeCate',LifeCateSchema);

module.exports = LifeCate;