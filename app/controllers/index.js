var Work = require("../models/work")
var WorkCate = require("../models/workCate")
var LifeCate = require("../models/lifeCate")
var NewPost = require("../models/newPost")
var markdown = require('markdown').markdown
var mark = require('marked')

exports.index = function(req,res){
	console.log("-----contr/index.js--- index function")

	var page = parseInt(req.query.p,10) || 0
	var count = 20
	var index = page * count

	Work.fetch(function(err,works){
		if(err){
			coonsole.log(err);
		}
		var results = works.slice(index,index+count)

		function compare(propertyName) { 
			return function (object1, object2) { 
				var value1 = object1[propertyName]; 
				var value2 = object2[propertyName]; 
				if (value2 < value1) { 
					return -1; 
				} 
				else if (value2 > value1) { 
					return 1; 
				} 
				else { 
					return 0; 
				} 
			} 
		} 
		var worksViewList = works;
		worksViewList.sort(compare("pv"));
		worksViewList = worksViewList.slice(0,10);
		for(var i = 0;i < worksViewList.length; i++){
			//works[i].content = markdown.toHTML(works[i].content).substring(0,280)
			if(worksViewList[i].title.length > 28){
				worksViewList[i].title = worksViewList[i].title.substring(0,28) + "..."
			}
		}

		WorkCate.fetch(function(err,wCates){
			if(err){console.log(err)}	
			LifeCate.fetch(function(err,lCates){
				if(err){console.log(err)}
				NewPost.fetch(function(err,newPosts){
					res.render('index',{
						listName: "热门文章",
						newPosts:worksViewList,
						works:results,
						wCates:wCates,
						lCates:lCates,
						currentPage: parseInt(page)+1,
						totalPage: Math.ceil(works.length/count),
						query: 'catId=list'
					});
				})
			})
		})
	})
}

exports.loadNav = function(req,res){
	WorkCate.fetch(function(err,cates){
			if(err){console.log(err)}	
			/*res.render('index',{
				cates:cates
			});*/
		/*next(cates);*/
		})
}

exports.showNewPost = function(req,res){
	console.log("-----contr/index.js--- showNewPost function")
	var id = req.params.id;

	Work.findById(id,function(err,work){
		if(err){console.log(err);}
		if(!work){
			res.redirect('/life/detail?id='+id)
		}else{
			res.redirect('/work/'+id)
		}
	})
}

exports.funny = function(req,res){
	console.log("-----contr/index.js--- funny function")
	WorkCate.fetch(function(err,wCates){
		if(err){console.log(err)}	
		LifeCate.fetch(function(err,lCates){
			if(err){console.log(err)}
			res.render('funny',{
				wCates:wCates,
				lCates:lCates,
			});
		})
	})
}

exports.search = function(req,res){
	var q = req.query.q
  	var page = parseInt(req.query.p, 10) || 0
  	var count = 10
  	var index = page * count

	Work
      .find({title: new RegExp(q + '.*', 'i')})
      .exec(function(err, works) {
        if (err) {
          console.log(err)
        }
        var results = works.slice(index, index + count)

        function compare(propertyName) { 
			return function (object1, object2) { 
				var value1 = object1[propertyName]; 
				var value2 = object2[propertyName]; 
				if (value2 < value1) { 
					return -1; 
				} 
				else if (value2 > value1) { 
					return 1; 
				} 
				else { 
					return 0; 
				} 
			} 
		} 
        var worksViewList = works;
		worksViewList.sort(compare("pv"));
		worksViewList = worksViewList.slice(0,10);
		for(var i = 0;i < worksViewList.length; i++){
			//works[i].content = markdown.toHTML(works[i].content).substring(0,280)
			if(worksViewList[i].title.length > 28){
				worksViewList[i].title = worksViewList[i].title.substring(0,28) + "..."
			}
		}

        WorkCate.fetch(function(err,wCates){
			if(err){console.log(err)}	
			LifeCate.fetch(function(err,lCates){
				if(err){console.log(err)}
				NewPost.fetch(function(err,newPosts){
					res.render('searchResult',{
						listName: "热门文章",
						newPosts:newPosts,
						works:results,
						wCates:wCates,
						lCates:lCates,
						currentPage: parseInt(page)+1,
						totalPage: Math.ceil(works.length/count),
						query: 'q=' + q
					});
				})
			})
		})

      })
}

exports.do404 = function(req,res){
	res.render("404")
}
