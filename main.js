var express = require('express');
var app = express();
var exphbs  = require('express-handlebars');
var sessions = require('express-session');
var path = require('path');
var fs = require('fs');
var dbObj = require('./views/js/dbConfig.js');
var hdlObj = require('./views/js/handles.js');
var bodyparser = require('body-parser');

app.use(sessions({
    secret:'rad3s'
}));
app.use(bodyparser());

//Create virtual directory for javascript, resources
app.use('/js',express.static(__dirname+'/views/js'));
app.use('/res',express.static(__dirname+'/views/res'));

//Setup Express-handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Load home page as root
app.get('/', function (req, res) {
    hdlObj.hdlHome(req,res);
});

//logout request
app.get('/logout',function(req,res){
    req.session.destroy();
    res.redirect('/');
});

app.get("/question",function(req,res){
    hdlObj.loadQuestionPage(req,res);
});

//login request
app.post("/loginTest",function(req,res){
    hdlObj.hdlLoginAction(req,res);
});

app.post("/regAction",function(req,res){
    dbObj.saveUser(req,res);
});

app.post("/saveQ",function(req,res){
    dbObj.saveQuestion(req,res,session);
});

app.post("/saveA",function(req,res){
    hdlObj.saveAns(req,res,session);
});

//Response for other pages
app.get(/^(.+)/, function (req, res) {
    try{                                //validate by 404-file not found
        if(fs.statSync(path.join(__dirname,'views/layouts',req.params[0]+'.html'))){
            res.sendFile(req.params[0]+'.html',{root:path.join(__dirname,'views/layouts')});
        }
    }catch(err){
        res.sendFile('404.html',{root:path.join(__dirname,'views/layouts')});
    }
});

//Create server and set port and listen the port
app.listen(4444,function(){
    console.log("\n\n**** Server UP => http://localhost:4444/ ****");
});
