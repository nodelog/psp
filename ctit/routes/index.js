var user = require('./user');
var filter = require('./filter');
var route = function (app) {
    app.get('/', function (req, res) {
        res.render('index', { title: 'CMS HOME', login: false});
    });
    app.get('/index', function (req, res) {
        res.render('index', { title: 'CMS HOME', login: false});
    });
    app.get('/about', filter.authorize, function (req, res) {
        res.render('about', { title: 'CMS ABOUT US'});
    });
    app.post('/user/login', user.login);//增加
    app.post('/user/reg', user.addUser);//提交
    app.get('/user/logout', user.logout);//提交

    app.get('/manager',filter.authorize, function (req, res) {
        res.render('manager/index', { title: 'CMS HOME', login: false});
    });
    app.get('/manager/user',filter.authorize,filter.authorizeAdmin,user.findByPage);
    app.post('/manager/user/delete',filter.authorize,filter.authorizeAdmin,user.delete);
    app.post('/manager/user/switch',filter.authorize,filter.authorizeAdmin,user.switch);
};
exports.route = route;