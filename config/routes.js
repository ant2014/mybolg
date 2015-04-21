var Index = require('../app/controllers/index')
var WorkCate = require('../app/controllers/workCate')
var LifeCate = require('../app/controllers/lifeCate')
var Work = require('../app/controllers/work')
var Life = require('../app/controllers/life')
var User = require('../app/controllers/user')

module.exports = function(app){
	
	//index
	app.get('/',Index.index)
	app.get('/newPost/:id',Index.showNewPost)
	
	//work category gl
	app.get('/gl/workCate',User.signinRequired,WorkCate.cateList)
	app.get('/gl/workCate/add',User.signinRequired,WorkCate.cateAdd)
	app.post('/gl/workCate/save',User.signinRequired,WorkCate.cateSave)
	app.get('/gl/workCate/update/:id',User.signinRequired,WorkCate.update)
	app.delete('/gl/workCate/delete/:id',User.signinRequired,WorkCate.delete)

	//work article gl
	app.get('/work/see',Work.see)
	app.get('/work/:id',Work.detail)

	app.get('/gl/work',User.signinRequired,Work.list)
	app.get('/gl/work/add',User.signinRequired,Work.add)
	app.post('/gl/work/save',User.signinRequired,Work.save)
	app.get('/gl/work/update/:id',User.signinRequired,Work.update)
	app.delete('/gl/work/delete/:id',User.signinRequired,Work.delete)

	//life category gl
	app.get('/gl/lifeCate',User.signinRequired,LifeCate.cateList)
	app.get('/gl/lifeCate/add',User.signinRequired,LifeCate.cateAdd)
	app.post('/gl/lifeCate/save',User.signinRequired,LifeCate.cateSave)
	app.get('/gl/lifeCate/update/:id',User.signinRequired,LifeCate.update)
	app.delete('/gl/lifeCate/delete/:id',User.signinRequired,LifeCate.delete)

	//life article gl
	app.get('/life/detail',Life.detail)
	app.get('/life',Life.index)
	app.get('/life/see',Life.see)

	app.get('/gl/life',User.signinRequired,Life.list)
	app.get('/gl/life/add',User.signinRequired,Life.add)
	app.post('/gl/life/save',User.signinRequired,Life.save)
	app.get('/gl/life/update/:id',User.signinRequired,Life.update)
	app.delete('/gl/life/delete/:id',User.signinRequired,Life.delete)

	//user
	/*app.post('/user/signup',User.signup);*/
	app.get('/admin/user/list',User.signinRequired,User.userlist);
	app.post('/user/signin',User.signin);
	app.get('/gl/logout',User.logout);
	app.get('/signin',User.showSignin);
	/*app.get('/signup',User.showSignup);*/

	app.get('/funny',Index.funny)
	app.get('*',Index.do404)

}
