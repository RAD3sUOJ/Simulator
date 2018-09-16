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

var QuestionDataSchema = new Schema({
	username:{type:String, required:true},
	questionTxt:String,
	answers:[
		{
			username:{type:String, required:true},
			answerTxt:String
		}
	]
},{collection:'questionData'});

var CounterSchema = Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
},{collection:'counters'});

var practicalData = mongoose.model('practicalData',PracticalDataSchema);
var userData = mongoose.model('userData',userDataSchema);
var questionData = mongoose.model('questionData',QuestionDataSchema);
var counter = mongoose.model('counter', CounterSchema);

dbObj.loadAll = function loadAll(){
    return practicalData;
}

dbObj.loadQuestionData = function loadQuestionData(){
    return questionData;
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

dbObj.saveQuestion = function saveQuestion(req,res,session){
	if(req.body.questionTxt==""){
		res.redirect("/question");
		return;
	}
	var question = {
		username:session.userId,
		questionTxt:req.body.questionTxt,
		answers:[
		]
	}
	var data = new questionData(question);
	data.save().then((result) => {
		res.redirect("/question");
	}).catch((err) => {
		res.send(err);
	});
}

dbObj.loadUsers = function loadUsers(){
    return userData;
}

dbObj.loadcounters = function loadcounters(){
    return counter;
}

module.exports = dbObj;