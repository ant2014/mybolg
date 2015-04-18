var mongoose = require('mongoose');
var NewPostSchema = require("../schemas/newPost.js")
var NewPost = mongoose.model('NewPost',NewPostSchema);

module.exports = NewPost;