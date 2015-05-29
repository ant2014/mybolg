var Life = require("../models/life")
var LifeCate = require("../models/lifeCate")
var WorkCate = require("../models/workCate")
var NewPost = require("../models/newPost")
var markdown = require('markdown').markdown
var mark = require('marked')
var _ = require('underscore');

exports.index = function(req,res){
	console.log("-----contr/index.js--- index function")

	var page = parseInt(req.query.p,10) || 0
	var count = 5
	var index = page * count

	Life.fetch(function(err,life){
		if(err){
			coonsole.log(err);
		}
		var results = life.slice(index,index+count)

		for(var i=0;i<life.length;i++){
			life[i].content = mark(life[i].content).substring(0,300)
		}

		LifeCate.fetch(function(err,lCates){
			if(err){console.log(err)}	
			WorkCate.fetch(function(err,wCates){
				if(err){console.log(err)}	
				NewPost.fetch(function(err,newPosts){
					res.render('lifeIndex',{
						newPosts: newPosts,
						lifes:results,
						lCates:lCates,
						wCates:wCates,
						currentPage: parseInt(page)+1,
						totalPage: Math.ceil(life.length/count),
						query: 'catId=list'
					});
				})
			})
		})
	})
}

exports.list = function(req,res){
	console.log("-----contr/life.js--- list function")
	Life.fetch(function(err,lifes){
		if(err){
			console.log(err);
		}
		LifeCate.fetch(function(err,cates){
			if(err){console.log(err)}	
			res.render('lifeList',{
			lifes:lifes,
			cates:cates
		});
		})
		
	})
}

exports.add = function(req,res){
	console.log("-----contr/life.js--- Add function")
	LifeCate.find({},function(err,cates){
			res.render('lifeAdd',
			{
				cates:cates,
				life:{
					title:"",
					content:"",
					author:"",
					origin:"",
					lifeCates:"",
				}
			})
	})
}

exports.save = function(req,res){
	console.log("-----contr/life.js--- save function")

	var oid = req.body.life._id;
	console.log("oid = " + oid);
	var lifeObj = req.body.life;
	console.log("lifeObj = " + lifeObj);
	var _life;

	if(oid){
		console.log("*******update life*******");
		Life.findById(oid,function(err,life){
			if(err){console.log(err);}
			_life = _.extend(life,lifeObj);
			_life.save(function(err,life){
				if(err){console.log(err);}
				res.redirect('/gl/life')
			})
		})
	}else{
		console.log("*******add life*******");
		_life = new Life({
			title:lifeObj.title,
			content:lifeObj.content,
			author:lifeObj.author,
			origin:lifeObj.origin,
			lifeCates:lifeObj.lifeCates,
		})

		_life.save(function(err,life){
			if(err){console.log(err);}
			console.log("life = "+life)
			var category = _life.lifeCates
			LifeCate.findById(category,function(err,lifeCate){
				if(err){console.log(err);}
				lifeCate.lifes.push(life._id)
				lifeCate.save(function(err,lifeCate2){
					if(err){console.log(err);}
					//add to newPost
					NewPost.fetch(function(err,newPosts){
						if(err){console.log(err);}
						var newPostLength = newPosts.length
						if(newPostLength >= 10){
							var i= newPostLength -10;
							while(i >= 0){
								var id = newPosts[newPostLength-(i+1)].id
								NewPost.remove({_id:id},function(err,newPost){
									if(err){console.log("err = " + err)}
									//add
									var _newPost = new NewPost(_life)
									_newPost.save(function(err,life){
										if(err){console.log("err = " + err)}
											res.redirect('/gl/life')
									})
								})
								i--
							}
						}else{
							var _newPost = new NewPost(_life)
							_newPost.save(function(err,life){
								res.redirect('/gl/life')
							})
						}
						
					})
				})
			})
		})
	}
}

exports.update = function(req,res){
	console.log("-----contr/life.js--- update function")
	var oid = req.params.id;

	if(oid){
		Life.findById(oid,function(err,life){
				LifeCate.find({},function(err,cates){
					res.render('lifeAdd',
						{
							cates:cates,
							life: life
						})
				})
		})
	}
}

exports.delete = function(req,res){
	console.log("-----contr/life.js--- delete function")
	var id = req.params.id;
	console.log("id = "+id)
	if(id){
		Life.remove({_id:id},function(err,life){
			if(err){console.log("err = " + err)}
			else{
				res.json({success:1})
			}
		})
	}
}


exports.detail = function(req,res){
	console.log("-----contr/life.js--- details function")
	var id = req.query.id;

	console.log("detail get params id="+id);
	Life.update({_id:id},{$inc:{pv:1}},function(err){
			if(err){console.log(err);}
		})

	
	Life.findById(id,function(err,life){
		if(err){console.log(err);}
		life.content = mark(life.content)

		//nav
		LifeCate.fetch(function(err,lCates){
			if(err){console.log(err)}	
			WorkCate.fetch(function(err,wCates){
				if(err){console.log(err)}	
				NewPost.fetch(function(err,newPosts){
					res.render('lifeDetail',{
						newPosts: newPosts,
						life:life,
						lCates:lCates,
						wCates:wCates
					});
				})
			})
		})
	//end nav
		
	});
}

exports.see = function(req,res){
	console.log("-----contr/life.js--- see function")
	var catId = req.query.catId
	var page = parseInt(req.query.p,10) || 0
	var count = 5
	var index = page * count
	console.log("catId = "+catId)
	if(catId=="list"){
		console.log("catId = if () {};")
		//ruo guo shi shouye
		Life.fetch(function(err,lifes){
			if(err){
				coonsole.log(err);
			}
			lifes = lifes.reverse()
			var results = lifes.slice(index,index+count)

			for(var i=0;i<results.length;i++){
				results[i].content = mark(results[i].content).substring(0,300)
			}
			
			LifeCate.fetch(function(err,lCates){
				if(err){console.log(err)}	
				WorkCate.fetch(function(err,wCates){
					if(err){console.log(err)}	
					NewPost.fetch(function(err,newPosts){
						res.render('lifeIndex',{
							newPosts: newPosts,
							lifes:results,
							lCates:lCates,
							wCates:wCates,
							currentPage: parseInt(page)+1,
							totalPage: Math.ceil(lifes.length/count),
							query: 'catId=list'
						});
					})
				})
			})
		})
	}else{
		console.log("catId = else ;")
		//cates
		LifeCate
		.find({_id: catId})
		.sort('-meta.updateAt')
		.populate({
			path: 'lifes'
			//options:{limit: 2,skip: index}
		})
		.exec(function(err,cates){
			if(err){
				console.log(err);
			}
			
			var cate = cates[0] || {}
			var lifes = cate.lifes || []
			lifes = lifes.reverse()
			var results = lifes.slice(index,index+count)
			for(var i=0;i<results.length;i++){
				results[i].content = mark(results[i].content).substring(0,300)
			}
			//nav
			LifeCate.fetch(function(err,lCates){
				if(err){console.log(err)}	
				WorkCate.fetch(function(err,wCates){
					if(err){console.log(err)}	
					NewPost.fetch(function(err,newPosts){
						res.render('lifeIndex',{
							newPosts: newPosts,
							lCates: lCates,
							wCates: wCates,
							lifes: results,
							currentPage: parseInt(page)+1,
							totalPage: Math.ceil(lifes.length/count),
							query: 'catId='+catId
						});
					})
				})
			})
		})
	}
}


