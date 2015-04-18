var mongoose = require('mongoose');
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var LifeCateSchema = new Schema({
	title:String,
	lifes:[{
		type:ObjectId,
		ref:'Life'}
	],
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

LifeCateSchema.pre('save',function(next){
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now();
	}else{
		this.meta.updateAt = Date.now();
	}
	next();
})

LifeCateSchema.statics = {
	fetch:function(cb){
		return this
			.find({})
			//.sort('meta.updateAt')
			.exec(cb)
	},
	findById:function(id,cb){
		return this.findOne({_id:id})
			.exec(cb)
	}
}

module.exports = LifeCateSchema;