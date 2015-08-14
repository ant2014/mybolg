var ZhaoPin = require("../models/zhaopin")
var markdown = require('markdown').markdown
var mark = require('marked')

var _ = require('underscore');

exports.list = function(req,res){
	console.log("-----contr/ZhaoPin.js--- list function")
	ZhaoPin.fetch(function(err,zhaoPins){
		if(err){
			console.log(err);
		}else{
			console.log(zhaoPins.length);
			res.render('zhaoPinList',{
				zhaoPins:zhaoPins
			});
			
		}
	})
}

exports.outList = function(req,res){
	console.log("-----contr/ZhaoPin.js--- outList function")
	res.render('zhaoPinListOut');
}

exports.outListGetData = function(req,res){
	console.log("-----contr/ZhaoPin.js--- get data outList function")
	var sSearch = req.body.sSearch;
	console.log("sSearch = " + sSearch);
	ZhaoPin.fetch(function(err,zhaoPins){
		if(err){
			console.log(err);
		}else{
			if(sSearch){
				var searchZhaoPins = [];
				for(var i = 0;i < zhaoPins.length;i++){
					if(zhaoPins[i].toString().indexOf(sSearch) > 0){
						searchZhaoPins.push(zhaoPins[i]);
					}
				}
				var result = "{\"iTotalRecords\": " + zhaoPins.length + ",\"iTotalDisplayRecords\": " + zhaoPins.length + ",\"aaData\": "+ JSON.stringify(searchZhaoPins) +"}";
				res.json({"jsonResult" : result})
			}else{
				var result = "{\"iTotalRecords\": " + zhaoPins.length + ",\"iTotalDisplayRecords\": " + zhaoPins.length + ",\"aaData\": "+ JSON.stringify(zhaoPins) +"}";
				res.json({"jsonResult" : result})
			}
		}
	})
}

exports.add = function(req,res){
	console.log("-----contr/ZhaoPin.js--- Add function")
	res.render('zhaoPinAdd',
	{
		zhaoPin:{
			company: "",
			category: "",
			gangwei: "",
			startTime: "",
			endTime: "",
			guanwang: "",
			xiangqing: "",
			beizhu: ""
		}
	})
}

exports.save = function(req,res){
	console.log("-----contr/ZhaoPin.js--- save function")

	var oid = req.body.zhaoPin._id;
	console.log("oid = " + oid);
	var zhaoPinObj = req.body.zhaoPin;
	console.log("ZhaoPinObj = " + zhaoPinObj);
	var _zhaoPin;

	if(oid){
		console.log("*******update ZhaoPin*******");
		ZhaoPin.findById(oid,function(err,zhaoPin){
			if(err){console.log(err);}
			_zhaoPin = _.extend(zhaoPin,zhaoPinObj);
			_zhaoPin.save(function(err,zhaoPin){
				if(err){console.log(err);}
				res.redirect('/gl/zhaoPin')
			})
		})
	}else{
		console.log("*******add ZhaoPin  zhaoPinObj.startTime*******" + zhaoPinObj.startTime);
		_zhaoPin = new ZhaoPin({
			company: zhaoPinObj.company,
			category: zhaoPinObj.category,
			gangwei: zhaoPinObj.gangwei,
			startTime:zhaoPinObj.startTime,
			endTime:zhaoPinObj.endTime,
			guanwang: zhaoPinObj.guanwang,
			xiangqing: zhaoPinObj.xiangqing,
			beizhu: zhaoPinObj.beizhu

		})

		_zhaoPin.save(function(err,zhaoPin){
			if(err){console.log(err);}

			res.redirect('/gl/zhaoPin')
		})
	}
}

exports.update = function(req,res){
	console.log("-----contr/ZhaoPin.js--- update function")
	var oid = req.params.id;

	if(oid){
		ZhaoPin.findById(oid,function(err,zhaoPin){
			res.render('zhaoPinAdd',
				{
					zhaoPin: zhaoPin
				})
		})
	}
}

exports.delete = function(req,res){
	console.log("-----contr/ZhaoPin.js--- delete function")
	var id = req.params.id;
	console.log("id = "+id)
	if(id){
		ZhaoPin.remove({_id:id},function(err,zhaoPin){
			if(err){console.log("err = " + err)}
			else{
				res.json({success:1})
			}
		})
	}
}



/*exports.detail = function(req,res){
	console.log("-----contr/ZhaoPin.js--- detail function")
	var id = req.params.id;

	console.log("detail get params id="+id);
	Work.update({_id:id},{$inc:{pv:1}},function(err){
			if(err){console.log(err);}
		})


	
	Work.findById(id,function(err,work){
		if(err){console.log(err);}
		//如果post中有这个work，则把post中的pv值更新
		NewPost.findById(id,function(err,postHaveThisWork){
			console.log("find id = " + id);
			if(err){console.log(err);}
			else{
				NewPost.update({_id:id},{pv:work.pv},function(err){
					if(err){console.log(err);}
				});
			}
			
		})

		work.content = mark(work.content)

		//nav
		WorkCate.fetch(function(err,wCates){
			if(err){console.log(err)}	
			LifeCate.fetch(function(err,lCates){
				if(err){console.log(err)}	
				NewPost.fetch(function(err,newPosts){
					res.render('workDetail',{
						newPosts: newPosts,
						work:work,
						wCates:wCates,
						lCates:lCates
					});
				})
			})
		})
	//end nav
		
	});
}

exports.see = function(req,res){
	console.log("-----contr/work.js--- see function")
	var catId = req.query.catId
	var page = parseInt(req.query.p,10) || 0
	var count = 20
	var index = page * count
	console.log("catId = "+catId)
	if(catId=="list"){
		console.log("catId = if () {};")
		//ruo guo shi shouye
		Work.fetch(function(err,works){
			if(err){
				coonsole.log(err);
			}
			//works.reverse()
			var results = works.slice(index,index+count)

			for(var i=0;i<results.length;i++){
				results[i].content = mark(results[i].content).substring(0,250)+"..."
			}
			//nav
			WorkCate.fetch(function(err,wCates){
				if(err){console.log(err)}	
				LifeCate.fetch(function(err,lCates){
					if(err){console.log(err)}	
					NewPost.fetch(function(err,newPosts){
						console.log("newPosts = "+newPosts)
						res.render('index',{
							listName: "最新文章",
							newPosts:newPosts,
							works:results,
							lCates:lCates,
							wCates:wCates,
							currentPage: parseInt(page)+1,
							totalPage: Math.ceil(works.length/count),
							query: 'catId=list'
						});
					})
				})
			})
		})
	}else{
		console.log("catId = else () {};")
		//cates
		WorkCate
		.find({_id: catId})
		.populate({
			path: 'works'
			//options:{limit: 2,skip: index}
		})
		.exec(function(err,cates){
			if(err){
				console.log(err);
			}
			
			var cate = cates[0] || {}
			var works = cate.works || []
			works.reverse()
			var results = works.slice(index,index+count)
			for(var i=0;i<results.length;i++){
				results[i].content = mark(results[i].content).substring(0,300)
			}
			//nav
			WorkCate.fetch(function(err,wCates){
				if(err){console.log(err)}	
				LifeCate.fetch(function(err,lCates){
					if(err){console.log(err)}	
					NewPost.fetch(function(err,newPosts){
						res.render('index',{
							listName: "最新文章",
							newPosts: newPosts,
							wCates: wCates,
							lCates: lCates,
							works: results,
							currentPage: parseInt(page)+1,
							totalPage: Math.ceil(works.length/count),
							query: 'catId='+catId
						});
					})
				})
			})
		})
	}
}

*/
