var hdlObj = {};

var dbObj = require('./dbConfig.js');

hdlObj.hdlHome = function hdlHome(req,res){
    session = req.session;
    dbObj.loadAll().find().then(function(doc){
        var loged;
        var url;
        var email = "";
        if(session.userId){
            loged = "Logout";
            url = "/logout"
            email = session.userId;
        }else{
            loged = "Login";
            url = "/login";
        }
        res.render('home',{
            practicals: doc,
            loged :loged,
            url:url,
            email:email
        });
    });
}

hdlObj.hdlLoginAction = function hdlLoginAction(req,res){
    dbObj.loadUsers().find().then(function(data){
        var valid=false;
        data.forEach(element => {
            if(req.body.email == element.email && req.body.pass == element.pass){
                session = req.session;
                session.userId = req.body.email;
                session.username = element.username;
                session.fullname = element.fullname;
                session.profession = element.profession;
                valid = true;
            }
        });
        if(valid){
            res.redirect('/');
        }else{
            res.redirect('/login');
        }
    });
}

module.exports = hdlObj;