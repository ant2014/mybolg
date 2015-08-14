var mongoose = require('mongoose');
var CrawlerSchema = require("../schemas/crawler.js")
var Crawler = mongoose.model('Crawler',CrawlerSchema);

module.exports = Crawler;