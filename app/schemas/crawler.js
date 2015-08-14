var mongoose = require('mongoose');
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var CrawlerSchema = new Schema({
	bankuai:String,
	date:String,
	title:String,
	href:String,
	pv:{
		type:Number,
		default:0
	},
	meta:{
		createAt:{
			type:Date,
			default:Date.now()
		},
		updateAt:{
			type:Date,
			default:Date.now()
		}
	}
})

CrawlerSchema.pre('save',function(next){
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now();
	}else{
		this.meta.updateAt = Date.now();
	}
	next();
})

CrawlerSchema.statics = {
	fetch:function(cb){
		return this
			.find({})
			.sort('-meta.updateAt')
			.exec(cb)
	},
	findById:function(id,cb){
		return this.findOne({_id:id})
			.exec(cb)
	}
}

module.exports = CrawlerSchema;