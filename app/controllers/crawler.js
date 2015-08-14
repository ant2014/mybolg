var Crawler = require("../models/crawler")
var markdown = require('markdown').markdown
var mark = require('marked')
var schedule = require("node-schedule");
var _ = require('underscore');
var superagent = require('superagent-charset'); //这三个外部依赖不要忘记npm install
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
//var eventproxy = require('eventproxy');
var fs = require('fs');

exports.getData = function(req, res) {
        var targetUrl = 'http://bbs.byr.cn/board/Job?_uid=guest';
        superagent.get(targetUrl)
            .set('Host', 'bbs.byr.cn')
            .set('User-Agent', 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:39.0) Gecko/20100101 Firefox/39.0')
            .set('Accept-Language', 'zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3')
            .set('Accept-Encoding', 'gzip, deflate')
            .set('X-Requested-With', 'XMLHttpRequest')
            .set('Referer', 'http://bbs.byr.cn/')
            .set('Cookie', 'nforum[UTMPUSERID]=guest; nforum[UTMPKEY]=4574079; nforum[UTMPNUM]=29730')
            .set('Connection', 'keep-alive')
            .set('Pragma', 'no-cache')
            .set('Cache-Control', 'no-cache')
            .charset('gbk')
            .end(function(err, res) {
                    var data = {};
                    data.titles = [];
                    data.hrefs = [];
                    var $ = cheerio.load(res.text);
                    //通过CSS selector来筛选数据
                    $('.board-list tbody tr').each(function(idx, element) {
                        if ($('.title_10', this).html().length > 10) {
                            //console.log($('.title_9 a',this).text());
                            //var buf = new Buffer($('.title_9 a',this).text(),'binary');
                            //console.log(iconv.decode($('.title_9 a',this).text(), 'gb2312'));
                            //data.titles.push(iconv.decode(buf, 'utf-8'));
                            data.titles.push($('.title_9 a', this).text());
                            data.hrefs.push($('.title_8 a', this).attr("href"));
                            data.dates = new Date();
                        }
                    });
                    var date = new Date();
                    var year = date.getFullYear();
                    var month = date.getMonth()+1;
                    var day = date.getDate();
                    var nowStr = year+"-"+month+"-"+day;

                    //清空当天的数据
                    //    Crawler.remove({date:nowStr,bankuai:'Job'},function(err,crawlers){
                    // 	if(err){console.log("err = " + err)}
                    // })
                    //插入当天的数据
                    console.log(data);
                    for (var i = 0, len = data.hrefs.length; i < len; i++) {
                        var flag = false;
                        (function(num){
                        	Crawler.fetch(function(err, crawlers) {
	                            for (var j = 0, dataLen = crawlers.length; j < dataLen; j++) {
	                            	//console.log(data.hrefs[num] + "***" + crawlers[j].href + "***" + flag+ "***" + num + "***" + j);
	                                if (data.hrefs[num] == crawlers[j].href) {
	                                    flag = true;
	                                    break;
	                                }
	                            }
	                            if (!flag) {
	                                //若表中当前没有才插入，若有什么都不做
	                                var _jobData;
	                                _jobData = new Crawler({
	                                    bankuai: 'Jobs',
	                                    date: nowStr,
	                                    title: data.titles[num],
	                                    href: data.hrefs[num],
	                                    pv: crawlers.length +1
	                                })

	                                _jobData.save(function(err, jobData) {
	                                    if (err) {
	                                        console.log(err);
	                                    }

	                                    //console.log("插入成功");
	                                })
	                            }
	                        })
                        })(i)
                    }
                });

        //兼职实习
        var targetUrl2 = 'http://bbs.byr.cn/board/ParttimeJob?_uid=guest'; 
        superagent.get(targetUrl2)
        .set('Host', 'bbs.byr.cn')
        .set('User-Agent', 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:38.0) Gecko/20100101 Firefox/38.0')
        .set('Accept-Language', 'zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3')
        .set('Accept-Encoding', 'gzip, deflate')
        .set('X-Requested-With', 'XMLHttpRequest')
        .set('Referer', 'http://bbs.byr.cn/')
        .set('Cookie', 'nforum[UTMPUSERID]=guest; nforum[UTMPKEY]=4574079; nforum[UTMPNUM]=29730; Hm_lvt_38b0e830a659ea9a05888b924f641842=1439292888; ')
        .set('Connection', 'keep-alive')
        .set('Pragma', 'no-cache')
        .set('Cache-Control', 'no-cache')
        .charset('gbk')
        .end(function(err, res) {
                var data = {};
                data.titles = [];
                data.hrefs = [];
                var $ = cheerio.load(res.text);
                //通过CSS selector来筛选数据
                $('.board-list tbody tr').each(function(idx, element) {
                    if ($('.title_10', this).html().length > 10) {
                        //console.log($('.title_9 a', this).text());
                        //var buf = new Buffer($('.title_9 a',this).text(),'binary');
                        //console.log(iconv.decode($('.title_9 a',this).text(), 'gb2312'));
                        //data.titles.push(iconv.decode(buf, 'utf-8'));
                        data.titles.push($('.title_9 a', this).text());
                        data.hrefs.push($('.title_8 a', this).attr("href"));
                        data.dates = new Date();
                    }
                });
                var date = new Date();
                var year = date.getFullYear();
                var month = date.getMonth()+1;
                var day = date.getDate();
                var nowStr = year+"-"+month+"-"+day;
                //清空当天的数据
                //    Crawler.remove({date:nowStr,bankuai:'ParttimeJob'},function(err,crawlers){
                // 	if(err){console.log("err = " + err)}
                // })
                //插入当天的数据
                for (var i = 0, len = data.hrefs.length; i < len; i++) {
                    var flag = false;
                    (function(num){
                    	Crawler.fetch(function(err, crawlers) {
                        for (var j = 0, dataLen = crawlers.length; j < dataLen; j++) {
                            if (data.hrefs[num] == crawlers[j].href) {
                                flag = true;
                                break;
                            }
                        }
                        if (!flag) {
                            //若表中当前没有才插入，若有什么都不做
                            var _jobData;
                            _jobData = new Crawler({
                                bankuai: 'Parttime',
                                date: nowStr,
                                title: data.titles[num],
                                href: data.hrefs[num],
                                pv: crawlers.length +1
                            })

                            _jobData.save(function(err, jobData) {
                                if (err) {
                                    console.log(err);
                                }

                                //console.log("插入成功");
                            })
                        }
                    })
                    })(i)
                }
            });
        }


exports.list = function(req, res) {
console.log("-----contr/Crawler.js--- list function")
var sSearch = req.body.sSearch;
Crawler.fetch(function(err, crawlers) {
    if (err) {
        console.log(err);
    } else {
        if (sSearch) {
            var byrDatas = [];
            for (var i = 0; i < crawlers.length; i++) {
                if (crawlers[i].toString().indexOf(sSearch) > 0) {
                    byrDatas.push(crawlers[i]);
                }
            }
            var result = "{\"iTotalRecords\": " + crawlers.length + ",\"iTotalDisplayRecords\": " + crawlers.length + ",\"aaData\": " + JSON.stringify(byrDatas) + "}";
            res.json({
                "jsonResult": result
            })
        } else {
            var result = "{\"iTotalRecords\": " + crawlers.length + ",\"iTotalDisplayRecords\": " + crawlers.length + ",\"aaData\": " + JSON.stringify(crawlers) + "}";
            res.json({
                "jsonResult": result
            })
        }
    }
})
}
