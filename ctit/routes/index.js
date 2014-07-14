    var user = require('./user');
    var route = function(app){
    app.get('/',function(req,res){
        res.render('index', { title: 'CMS HOME'});
    });
    app.get('/index',function(req,res){
        res.render('index', { title: 'CMS HOME'});
    });
    app.get('/about',function(req,res){
        res.render('about', { title: 'CMS ABOUT US'});
    });
    app.post('/user/login',user.login);//增加
    app.post('/user/reg',user.addUser);//提交
//    app.get('/user/:name',movie.movieAdd);//编辑查询
//    app.get('/movie/json/:name',movie.movieJSON);//JSON数据
};
exports.route=route;