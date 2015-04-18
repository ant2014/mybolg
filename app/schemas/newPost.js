var mongoose = require('mongoose');
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var LifeSchema = new Schema({
	title:String,
	content:String,
	author:String,
	pv:{
		type:Number,
		default:0
	},
	origin:String,
	lifeCates:{
		type:ObjectId,
		ref:'LifeCate'
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

LifeSchema.pre('save',function(next){
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now();
	}else{
		this.meta.updateAt = Date.now();
	}
	next();
})

LifeSchema.statics = {
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

module.exports = LifeSchema;