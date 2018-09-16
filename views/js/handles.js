var hdlObj = {};

var dbObj = require('./dbConfig.js');

hdlObj.hdlHome = function hdlHome(req,res){
    session = req.session;
    dbObj.loadAll().find().then(function(doc){
        var loged;
        var url;
        var email = "";
        var display = "none";
        if(session.userId){
            loged = "Logout";
            url = "/logout";
            email = session.userId;
            display = session.display;
        }else{
            loged = "Login";
            url = "/login";
        }
        res.render('home',{
            practicals: doc,
            loged :loged,
            url:url,
            email:email,
            display:display
        });
    });
}

hdlObj.loadQuestionPage = function loadQuestionPage(req,res){
    dbObj.loadQuestionData().find().then(function(doc){
        res.render('layouts/questions',{
            qlist:doc
        });
    });
}

hdlObj.saveAns = function saveAns(req,res,session){
    if(req.body.answerTxt==""){
		res.redirect("/question");
		return;
    }

    var ans = {
        username:session.username,
        answerTxt:req.body.answerTxt
    }

    dbObj.loadQuestionData().update({
        username:req.body.username,
        questionTxt:req.body.questionTxt
    },{
        $push:{answers:ans}
    })
}

hdlObj.hdlLoginAction = function hdlLoginAction(req,res){
    dbObj.loadUsers().find().then(function(data){
        var valid=false;
        data.forEach(element => {
            if(req.body.email == element.email && req.body.pass == element.pass){
                session = req.session;
                session.userId = element.username;
                session.email=element.email;
                session.username = element.username;
                session.fullname = element.fullname;
                session.profession = element.profession;
                session.display = "block";
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