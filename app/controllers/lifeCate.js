var LifeCate = require("../models/lifeCate")
var _ = require('underscore');

exports.cateList = function(req,res){
	console.log("-----contr/kifeCate.js--- cateList function")
	LifeCate.fetch(function(err,lifeCates){
		if(err){
			coonsole.log(err);
		}
		res.render('lifeCateList',{
			lifeCates:lifeCates
		});
	})
}

exports.cateAdd = function(req,res){
	console.log("-----contr/LifeCate.js--- cateAdd function")
	res.render('lifeCateAdd',{
		lifeCate:{
			title:""
		}
	})
}

exports.cateSave = function(req,res){
	console.log("-----contr/LifeCate.js--- cateSave function")

	var oid = req.body.lifeCate._id;
	console.log("oid = " + oid);
	var lifeCateObj = req.body.lifeCate;
	console.log("lifeCateObj = " + lifeCateObj);
	var _lifeCate;

	if(oid){
		console.log("movie add if");
		LifeCate.findById(oid,function(err,lifeCate){
			if(err){console.log(err);}
			_lifeCate = _.extend(lifeCate,lifeCateObj);
			_lifeCate.save(function(err,lifeCate){
				if(err){console.log(err);}
				res.redirect('/gl/lifeCate')
			})
		})
	}else{
		//Add
		console.log("else qian");
		_category = new LifeCate({
			title: lifeCateObj.title
		})
		_category.save(function(err,category){
			if(err){console.log(err);}
			res.redirect('/gl/lifeCate')
		})
	}
}

exports.update = function(req,res){
	console.log("-----contr/lifeCate.js--- update function")
	var oid = req.params.id;

	if(oid){
		LifeCate.findById(oid,function(err,lifeCate){
			res.render('lifeCateAdd',{
				lifeCate: lifeCate
			})
		})
	}
}

exports.delete = function(req,res){
	console.log("-----contr/lifeCate.js--- delete function")
	var id = req.params.id;
	if(id){
		LifeCate.remove({_id:id},function(err,lifeCate){
			if(err){console.log("err = " + err)}
			else{
				res.json({success:1})
			}
		})
	}
}


