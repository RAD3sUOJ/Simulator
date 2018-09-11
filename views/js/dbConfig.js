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
	username:{type:String, required:true},
	fullname:String,
	email:{type:String, required:true},
	pass:{type:String, required:true},
	profession:String
})

var practicalData = mongoose.model('practicalData',PracticalDataSchema);
var userData = mongoose.model('userData',userDataSchema);

dbObj.loadAll = function loadAll(){
    return practicalData;
}

dbObj.user = function user(){
	return userData;
}

module.exports = dbObj;