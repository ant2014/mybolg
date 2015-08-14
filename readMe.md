###0、这是我的一个基于Node.js和mongodb实现的个人博客

您可以点击这里查看运行效果，[走路去纽约](http://www.coolwubo.com)

该项目有两个分支，即master分支和planB分支，planB分支在页面显示上进行了大量的变化，并新增了个别功能，但是整体的项目结构没有根本改变。

###1、准备工作

安装node&mongodb

###2、clone 源码
执行npm install
启动mongodb,进入mongdb/bin下执行./mongod开启数据库
启动node app.js

###3、查看数据库
进入mongodb/bin目录下执行./mongo打开数据库，执行use [数据库名]查看数据库，也可以使用mongoVUE等可视化工具来查看数据

###4、相关技术性问题
  express--一个简洁而灵活的 node.js Web应用框架
    Express （ http://expressjs.com/ ） 除了为 http 模块提供了更高层的接口外，还实现了
　　　　许多功能，其中包括：
　　　　 路由控制；
　　　　 模板解析支持；
　　　　 动态视图；
　　　　 用户会话；
　　　　 CSRF 保护；
　　　　 静态文件服务；
　　　　 错误控制器；
　　　　 访问日志；
　　　　 缓存；
　　　　 插件支持。

　　 Express 提供了路由控制权转移的方法，即回调函数的第三个参数next，通过调用next()，会将路由控制权转移给后面的规则。

　mongodb--适合node的关系型数据库
　  mongodb --- http://docs.mongodb.org/manual/ 手册

　　MongoDB介绍及安装 --  http://www.cnblogs.com/lipan/archive/2011/03/08/1966463.html

　　什么是MongoDB ? ---  http://www.w3cschool.cc/mongodb/mongodb-intro.html

　Mongoose -- Mongoose是MongoDB的一个对象模型工具，既类似ORM，让NodeJS更容易操作Mongodb数据库，Mongoose文档

　node模版引擎--ejs，jade  
　　 
  这里注意：其实配置package.json非常重要，我们写好所需的依赖模块，然后通过 npm install 就可以将参数里面的依赖一起进行安装
