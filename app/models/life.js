var mongoose = require('mongoose');
var LifeSchema = require("../schemas/life.js")
var Life = mongoose.model('Life',LifeSchema);

module.exports = Life;