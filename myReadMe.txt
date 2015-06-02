a如果有文件上传，我们应该先做上传，然后再做数据对数据库操作
这里我们用中间件来实现
中间件是整个流水线中间对一环，对收到对数据进行处理，然后返回合适对格式
app.post('/admin/movie/new',User.signinRequired,Movie.savePoster,Movie.add);
为了先做上传，我们增加了一个中间环节


exports.savePoster=function(){}

为了处理enctype="multipart/form-data"
我们需要在app.js中引入
app.use(express.multipart())

zhe shi lao banben de 
xin ban ru xia

npm install connect-multiparty
var multipart = require('connect-multiparty');
app.use(multipart());



if item.poster.indexOf('http:') > -1
	img(src="#{item.poster}",alt="#{item.title}")
else
	img(src="/upload/#{item.poster}",alt="#{item.title}")

方可统计对功能


单元测试
最大对意义，是满足功能和后期重构

mocha
grunt 集成 mocha

npm install grunt-mocha-test --save
grunt.js
grunt.loadNpmTasks('grunt-mocha-test')

注册一个任务
grunt.registerTask('test',['mochaTest'])
配置任务
mochaTest:{
	options:{
		reporter:'spec'
	},
	src:['test/**/*.js'] //数组，可放多个目录
	
}

创建一个test文件夹
分别测试movie /user
先在test下创建user文件夹
user下建议个user.js
在其中写测试用例

var crypto = require('crypto')
var bcrypt = require('bcrypt')

function getRandomString(len){
	if(!) len = 16  //如果没有默认16
	//通过crypto生成16位的
	return crypto.randomBytes(Math.ceil(16/2).toString('hex'))
	
}

var should = require('should')	//npm install should --save
var app = require("../../app")
var mongoose = require('mongoose')
var User = require('../../app/models/user')

//test
var user;
descripe('<Unit Test',function(){
	//先测试模型
	descripe('Model User:',function(){
		before(function(done){
			user = {
				name:getRandomString(),
				password:'password'
			}
		})//之前做的,比如预定义变量

		done()//测试从其调用开始
		
	})
	descripe('Before Method save',function(){
		it('should begin without test
user',function(done){//开始的时候数据库里是没有user的
			
		});
//一个it()就代表一个测试用例，只要跑通了IT，其中定义好的比对等等任务，就是跑完的，在it中调用done()，只能调用一次，调用多次会出问题，单元测试的单元我们可以狭义的理解为it,代表测试某种类型的功能点，
it()就是单元
	})
	descripe('Before',function(){
		before(function())
	})
})
//descripe可以嵌套，即其中可以有子测试模块，可以进行分组

grunt-contrib-less
grunt-contrib-uglify	//压缩
grunt-contrib-jshintrc  //

空格缩进
是否带分号
规范代码编写



1\
建立基本的目录结构
npm install express jade mongoose
如果机器没有安装bower,则npm install bower -g
安装bootstrap
bower install bootstrap
注意,其有个默认的安装目录，如果不想安装在其中，可以在项目根目录下创建
.bowerrc文件，其中写入
{
	"directory":"public/libs"
}
bower init初始化bower.json文件
npm init 初始化package.json文件  里面会有所有的依赖文件

编写app.js
引入基本模块

var express = require('express');
var path = require('path');
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var dbUrl = 'mongodb://localhost/imooc';
mongoose.connect(dbUrl);

var app = express();	//start view

app.set('view engine','jade');
app.set('views','./app/views/pages');


app.use(express.static(path.join(__dirname,'public')));
require('./config/routes.js')(app);
app.listen(port);
console.log("-----app.js----- server started on port : "+port );

为了便于开发，我们增加grunt任务
npm install grunt --save-dev
npm install grunt-contrib-watch --save-dev
npm install grunt-nodemon --save-dev
npm install grunt-concurrent --save-dev
然后在根目录下编写gruntfile.js
查看 添加 修改 删除
工作积累 生活点滴 推荐电影 个人简历
走路去纽约

我的朋友们

文章名称
类别
访问量
写入时间
更新时间
工作文章列表

目录

提交

来源

作者

分类
内容
访问量

生活

走路去纽约

最新文章

关注并喜欢前端技术，致力于成为一名优秀的前端攻城狮.业余爱好DOTA摄影骑车旅游，希望有朝一日能背着相机走遍喜欢的每一个角落。

用户名
密码

登录
注册

退出登
喜欢倒腾，对互联网充满热情
