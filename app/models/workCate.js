var mongoose = require('mongoose');
var WorkCateSchema = require("../schemas/workCate.js")
var WorkCate = mongoose.model('WorkCate',WorkCateSchema);

module.exports = WorkCate;