var filter = require('./filter');
var user = require('./../controllers/user');
var category = require('./../controllers/category');
var content = require('./../controllers/content');
var route = function (app) {
    app.get('/', content.findByPage);
    app.get('/index', content.findByPage);
    app.get('/about', filter.authorize, function (req, res) {
        res.render('about', { title: 'CMS ABOUT US'});
    });
    app.post('/user/login', user.login);
    app.post('/user/reg', user.addUser);
    app.get('/user/logout', user.logout);

    app.get('/manager',filter.authorize, function (req, res) {
        res.render('manager/index', { title: 'CMS HOME', login: false});
    });
    app.get('/manager/user',filter.authorize,filter.authorizeAdmin,user.findByPage);
    app.post('/manager/user/delete',filter.authorize,filter.authorizeAdmin,user.delete);
    app.post('/manager/user/switch',filter.authorize,filter.authorizeAdmin,user.switch);
    app.get('/manager/category',filter.authorize,filter.authorizeAdmin,category.findByPage);
    app.post('/manager/category/add',filter.authorize,filter.authorizeAdmin,category.add);
    app.post('/manager/category/modify',filter.authorize,filter.authorizeAdmin,category.update);
    app.post('/manager/category/delete',filter.authorize,filter.authorizeAdmin,category.delete);
    app.get('/content/addPage',filter.authorize,category.findAll);
    app.post('/content/add',filter.authorize,content.add);
    app.get('/manager/content',filter.authorize,content.findByPage);
    app.post('/manager/content/delete',filter.authorize,content.delete);
    app.get('/manager/content/detail',filter.authorize,content.findById);
    app.get('/content/detail',content.findById);
    app.get('/content/category',content.findByCategory);

};
exports.route = route;