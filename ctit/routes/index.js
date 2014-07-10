    var movie = require('./movie');
    var route = function(app){
    app.get('/',function(req,res){
        res.render('index', { title: 'Create Thinking Movie' });
    });
    app.get('/reg',function(req,res){
        res.render('reg', { title: '注册' });
    });
    app.post('/reg',function(req,res){
    });
    app.get('/login',function(req,res){
        res.render('login', { title: '登录' });
    });
    app.post('/login',function(req,res){
    });
    app.get('/logout',function(req,res){
    });
    app.get('/post',function(req,res){
        res.render('post', { title: '发表' });
    });
    app.post('/post',function(req,res){
    });
    app.get('/movie/add',movie.movieAdd);//增加
    app.post('/movie/add',movie.doMovieAdd);//提交
    app.get('/movie/:name',movie.movieAdd);//编辑查询
//    app.get('/movie/json/:name',movie.movieJSON);//JSON数据
};
    exports.route=route;