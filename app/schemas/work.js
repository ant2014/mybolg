var mongoose = require('mongoose');
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var WorkSchema = new Schema({
	title:String,
	content:String,
	author:String,
	pv:{
		type:Number,
		default:0
	},
	origin:String,
	workCates:{
		type:ObjectId,
		ref:'WorkCate'
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

WorkSchema.pre('save',function(next){
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now();
	}else{
		this.meta.updateAt = Date.now();
	}
	next();
})

WorkSchema.statics = {
	fetch:function(cb){
		return this
			.find({})
			.sort('-meta.updateAt')
			.exec(cb)
	},
	findById:function(id,cb){
		return this.findOne({_id:id})
			.exec(cb)
	},
	findCateById:function(id,cb){
		return this.findOne({_id:id}).populate('workCates')
			.exec(cb)
	}
}

module.exports = WorkSchema;