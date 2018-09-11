var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');
var fs = require('fs');
var homeObj = require('./views/js/homeCtl.js');

var app = express();

//Create virtual directory for javascript, resources
app.use('/js',express.static(__dirname+'/views/js'));
app.use('/res',express.static(__dirname+'/views/res'));

//Setup Express-handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Load home page as root
app.get('/', function (req, res) {
    res.render('home');
    console.log(homeObj.loadAll());
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
    console.log("*** Server UP ***");
});
