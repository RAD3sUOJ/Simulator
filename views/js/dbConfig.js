var homeObj = {};       //for export functions

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/simulator');

var Schema = mongoose.Schema;

var PracticalDataSchema = new Schema({
    title : String,
	name : String,
	description : String,
	url : String
},{collection:'practicals'});

var practicalData = mongoose.model('practicalData',PracticalDataSchema);

homeObj.loadAll = function loadAll(){
    return practicalData;
}

module.exports = homeObj;