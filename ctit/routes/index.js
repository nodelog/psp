var filter = require('./filter');
var user = require('./../controllers/user');
var category = require('./../controllers/category');
var content = require('./../controllers/content');
var comment = require('./../controllers/comment');
var route = function (app) {
	app.get('/', filter.createUser, content.findByPage);
    app.get('/index', filter.createUser, content.findByPage);
    app.get('/about', function (req, res) {
        res.render('about', { title: 'ABOUT US'});
    });
    app.post('/user/login', user.login);
    app.post('/user/reg', user.addUser);
    app.get('/user/logout', user.logout);

    app.get('/manager', filter.authorize, function (req, res) {
        res.render('manager/index', { title: 'CMS HOME', login: false});
    });
    app.get('/manager/user', filter.authorize, filter.authorizeAdmin, user.findByPage);
    app.get('/manager/category', filter.authorize, filter.authorizeAdmin, category.findByPage);
    app.get('/manager/content', filter.authorize, function (req, res) {
        var session = req.session;
        if (session != null) {
            var user = session.user;
            if (user != null) {
                var role = user.role;
                if (role == 0) {
                    content.findByPage(req, res);
                } else {
                    content.findByUser(req, res);
                }
            } else {
                res.redirect("/");
            }
        } else {
            res.redirect("/");
        }
    });
	app.post('/manager/content/share', filter.authorize, content.share);
    app.get('/manager/content/detail', filter.authorize, content.findById);
    app.post('/manager/user/delete', filter.authorize, filter.authorizeAdmin, user.delete);
    app.post('/manager/user/switch', filter.authorize, filter.authorizeAdmin, user.switch);
    app.post('/manager/category/add', filter.authorize, filter.authorizeAdmin, category.add);
    app.post('/manager/category/modify', filter.authorize, filter.authorizeAdmin, category.update);
    app.post('/manager/category/delete', filter.authorize, filter.authorizeAdmin, category.delete);
    app.post('/manager/content/delete', filter.authorize, content.delete);
    app.get('/category/all', category.findAll);
    app.get('/content/detail', content.findById);
    app.get('/content/edit', filter.authorize, content.findById);
    app.get('/content/category', content.findByCategory);
    app.post('/content/add', filter.authorize, content.add);
    app.get('/content/addPage', function (req, res) {
        res.render("addContent", {"title": "add content page"});
    });
    app.post('/comment/add', filter.authorize, comment.add);
    app.get('/comment/all', comment.findByPageAndContent);
    app.get('/session', user.session);
    app.post('/session', user.session);
    app.get('/content/user', filter.authorize, content.findByUser);

    //日志路由
    app.get('/log',filter.log);

    // 下面的路由必须放到最后，404页面
    app.get('*', filter.log, function(req, res){res.render('error', {title: 'No Found'});});
};
exports.route = route;