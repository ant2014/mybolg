var mongoose = require('mongoose');
var WorkSchema = require("../schemas/work.js")
var Work = mongoose.model('Work',WorkSchema);

module.exports = Work;