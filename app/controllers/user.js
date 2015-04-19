var User = require('../models/user');
var WorkCate = require("../models/workCate")
var LifeCate = require("../models/lifeCate")
var bodyParser = require('body-parser');

//signup
// exports.signup = function(req,res){
// 	var _user = req.body.user;
// 	console.log("signup Z_user = "+ _user.name);
// 	//
// 	//console.log("signup user = "+ user.name);

// 	User.findOne({name:_user.name},function(err,user){
// 		if(err) console.log(err);
// 		//console.log("User.findOne user.name = "+ user.name);
// 		if(user){
// 			console.log("the user is on");
// 			return res.redirect('/signin');
// 		}
// 		else{
// 			user = new User(_user);
// 			user.save(function (err,user){
// 				if(err){console.log(err)}
// 				console.log(user+"added success");
// 				res.redirect("/gl/work");
// 			})
// 		}
// 	})
// }

//user list page
exports.userlist = function(req,res){
	User.fetch(function(err,users){
		if(err){
			coonsole.log(err);
		}
		res.render('userList',{title:'imooc admin user/list',users:users});
	})
}

//signin
exports.signin = function(req,res){
	var _user = req.body.user;
	var name = _user.name;
	var password = _user.password;

	User.findOne({name: name},function(err,user){
		if(err) console.log(err);

		if(!user){
			console.log("have no this user");
			return res.redirect('/');
		}

		user.comparePassword(password,function(err,isMatch){
			if(err) console.log(err);

			if(isMatch){
				req.session.user = user;

				console.log("password is matched");
				return res.redirect('/gl/work');
			}else{
				return res.redirect('/signin');
				console.log("password is not matched");
			}
		})
	})
}

//logout
exports.logout = function(req,res){
	delete req.session.user
	//delete app.locals.user
	res.redirect('/');
}
//signin
exports.showSignin = function(req,res){
	console.log("i am in showSignin");

	WorkCate.fetch(function(err,wCates){
			if(err){console.log(err)}	
			LifeCate.fetch(function(err,lCates){
				if(err){console.log(err)}	
				res.render('signin',{
					title:'signin ',
					wCates:wCates,
					lCates:lCates,
				});
			})
		})
	
}
//signup
/*exports.showSignup = function(req,res){
	WorkCate.fetch(function(err,wCates){
			if(err){console.log(err)}	
			LifeCate.fetch(function(err,lCates){
				if(err){console.log(err)}	
				res.render('signup',{
					title:'signup ',
					wCates:wCates,
					lCates:lCates,
				});
			})
		})
}*/

//midware for user
exports.signinRequired = function(req,res,next){
	var user = req.session.user
	if(!user){
		return res.redirect('/signin');
	}
	next();
}

//midware for admin
exports.adminRequired = function(req,res,next){
	var user = req.session.user
	if( user.role < 10 ){
		return res.redirect('/signin');
	}
	next();
}