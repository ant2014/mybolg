var WorkCate = require("../models/workCate")
var _ = require('underscore');

exports.cateList = function(req,res){
	console.log("-----contr/workCate.js--- cateList function")
	WorkCate.fetch(function(err,workCates){
		if(err){
			coonsole.log(err);
		}
		res.render('workCateList',{
			workCates:workCates
		});
	})
}

exports.cateAdd = function(req,res){
	console.log("-----contr/workCate.js--- cateAdd function")
	res.render('workCateAdd',{
		workCate:{
			title:""
		}
	})
}

exports.cateSave = function(req,res){
	console.log("-----contr/workCate.js--- cateSave function")

	var oid = req.body.workCate._id;
	console.log("oid = " + oid);
	var workCateObj = req.body.workCate;
	console.log("workCateObj = " + workCateObj);
	var _workCate;

	if(oid){
		console.log("movie add if");
		WorkCate.findById(oid,function(err,workCate){
			if(err){console.log(err);}
			_workCate = _.extend(workCate,workCateObj);
			_workCate.save(function(err,workCate){
				if(err){console.log(err);}
				res.redirect('/gl/workCate')
			})
		})
	}else{
		//Add
		console.log("else qian");
		_category = new WorkCate({
			title: workCateObj.title
		})
		_category.save(function(err,category){
			if(err){console.log(err);}
			res.redirect('/gl/workCate')
		})
	}
}

exports.update = function(req,res){
	console.log("-----contr/workCate.js--- update function")
	var oid = req.params.id;

	if(oid){
		WorkCate.findById(oid,function(err,workCate){
			res.render('workCateAdd',{
				workCate: workCate
			})
		})
	}
}

exports.delete = function(req,res){
	console.log("-----contr/workCate.js--- delete function")
	var id = req.params.id;
	if(id){
		WorkCate.remove({_id:id},function(err,workCate){
			if(err){console.log("err = " + err)}
			else{
				res.json({success:1})
			}
		})
	}
}


