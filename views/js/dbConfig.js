var dbObj = {};       //for export functions

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/simulator');

var Schema = mongoose.Schema;

var PracticalDataSchema = new Schema({
	name : String,
	description : String,
	url : String
},{collection:'practicals'});

var userDataSchema = new Schema({
	username:{type:String, required:true, index: { unique: true }},
	fullname:String,
	email:{type:String, required:true, index: { unique: true }},
	pass:{type:String, required:true},
	profession:String
},{collection:'userData'});

var practicalData = mongoose.model('practicalData',PracticalDataSchema);
var userData = mongoose.model('userData',userDataSchema);

dbObj.loadAll = function loadAll(){
    return practicalData;
}

dbObj.saveUser = function saveUser(req,res){
	if(req.body.pass=="" || req.body.pass != req.body.passR){
		res.redirect("/reg");
		return;
	}
	var user = {
        username:req.body.username,
        fullname:req.body.fullname,
        email:req.body.email,
        pass:req.body.pass,
        profession:req.body.profession
	};
    var data = new userData(user);
	data.save().then((result) => {
		res.redirect("/login");
	}).catch((err) => {
		res.redirect("/reg");
	});;
}

dbObj.loadUsers = function loadUsers(){
    return userData;
}

module.exports = dbObj;