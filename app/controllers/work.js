var Work = require("../models/work")
var WorkCate = require("../models/workCate")
var LifeCate = require("../models/lifeCate")
var NewPost = require("../models/newPost")
var markdown = require('markdown').markdown
var _ = require('underscore');

exports.list = function(req,res){
	console.log("-----contr/work.js--- list function")
	Work.fetch(function(err,works){
		if(err){
			console.log(err);
		}
		WorkCate.fetch(function(err,cates){
			console.log(works);
			if(err){console.log(err)}	
				res.render('workList',{
				works:works,
				cates:cates
			});
		})
		
	})
}

exports.add = function(req,res){
	console.log("-----contr/work.js--- Add function")
	WorkCate.find({},function(err,cates){
			res.render('workAdd',
			{
				cates:cates,
				work:{
					title:"",
					content:"",
					author:"",
					origin:"",
					workCates:"",
				}
			})
	})
}

exports.save = function(req,res){
	console.log("-----contr/work.js--- save function")

	var oid = req.body.work._id;
	console.log("oid = " + oid);
	var workObj = req.body.work;
	console.log("workObj = " + workObj);
	var _work;

	if(oid){
		console.log("*******update Work*******");
		Work.findById(oid,function(err,work){
			if(err){console.log(err);}
			_work = _.extend(work,workObj);
			_work.save(function(err,work){
				if(err){console.log(err);}
				res.redirect('/gl/work')
			})
		})
	}else{
		console.log("*******add Work*******");
		_work = new Work({
			title:workObj.title,
			content:workObj.content,
			author:workObj.author,
			origin:workObj.origin,
			workCates:workObj.workCates,
		})

		_work.save(function(err,work){
			if(err){console.log(err);}

			var category = _work.workCates
			WorkCate.findById(category,function(err,workCate){
				if(err){console.log(err);}
				workCate.works.push(work._id)
				workCate.save(function(err,workCate2){
					if(err){console.log(err);}
					//add to newPost
					NewPost.fetch(function(err,newPosts){
						if(err){console.log(err);}
						console.log("newPosts ="+newPosts)
						console.log("newPosts.length="+newPosts.length)
						var newPostLength = newPosts.length
						if(newPostLength >= 10){
							var i= newPostLength -10;
							while(i >= 0){
								var id = newPosts[newPostLength-(i+1)].id
								NewPost.remove({_id:id},function(err,newPost){
									if(err){console.log("err = " + err)}
									//add
									var _newPost = new NewPost(_work)
									_newPost.save(function(err,work){
										if(err){console.log("err = " + err)}
											res.redirect('/gl/work')
									})
								})
								i--
							}
						}else{
							var _newPost = new NewPost(_work)
							_newPost.save(function(err,work){
								res.redirect('/gl/work')
							})
						}
						
					})
					
				})
			})
		})
	}
}

exports.update = function(req,res){
	console.log("-----contr/work.js--- update function")
	var oid = req.params.id;

	if(oid){
		Work.findById(oid,function(err,work){
				WorkCate.find({},function(err,cates){
					res.render('workAdd',
						{
							cates:cates,
							work: work
						})
				})
		})
	}
}

exports.delete = function(req,res){
	console.log("-----contr/work.js--- delete function")
	var id = req.params.id;
	console.log("id = "+id)
	if(id){
		Work.remove({_id:id},function(err,work){
			if(err){console.log("err = " + err)}
			else{
				res.json({success:1})
			}
		})
	}
}



exports.detail = function(req,res){
	console.log("-----contr/work.js--- detail function")
	var id = req.params.id;

	console.log("detail get params id="+id);
	Work.update({_id:id},{$inc:{pv:1}},function(err){
			if(err){console.log(err);}
		})

	
	Work.findById(id,function(err,work){
		if(err){console.log(err);}
		work.content = markdown.toHTML(work.content)

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
	var count = 5
	var index = page * count
	console.log("catId = "+catId)
	if(catId=="list"){
		console.log("catId = if () {};")
		//ruo guo shi shouye
		Work.fetch(function(err,works){
			if(err){
				coonsole.log(err);
			}
			works.reverse()
			var results = works.slice(index,index+count)

			for(var i=0;i<results.length;i++){
				results[i].content = markdown.toHTML(results[i].content).substring(0,300)
			}
			//nav
			WorkCate.fetch(function(err,wCates){
				if(err){console.log(err)}	
				LifeCate.fetch(function(err,lCates){
					if(err){console.log(err)}	
					NewPost.fetch(function(err,newPosts){
						console.log("newPosts = "+newPosts)
						res.render('index',{
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
				results[i].content = markdown.toHTML(results[i].content).substring(0,300)
			}
			//nav
			WorkCate.fetch(function(err,wCates){
				if(err){console.log(err)}	
				LifeCate.fetch(function(err,lCates){
					if(err){console.log(err)}	
					NewPost.fetch(function(err,newPosts){
						res.render('index',{
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


