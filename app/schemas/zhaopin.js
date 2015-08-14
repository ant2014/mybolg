var mongoose = require('mongoose');
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var ZhaoPinSchema = new Schema({
	company:String,
	category:String,
	gangwei:String,
	startTime:String,
	endTime:String,
	guanwang:String,
	xiangqing:String,
	beizhu:String,
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

ZhaoPinSchema.pre('save',function(next){
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now();
	}else{
		this.meta.updateAt = Date.now();
	}
	next();
})

ZhaoPinSchema.statics = {
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

module.exports = ZhaoPinSchema;