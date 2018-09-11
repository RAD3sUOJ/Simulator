var homeObj = {};       //for export functions

var mongoose = require('mongoose');
mongoose.connect("localhost:27017/simulator");

var Schema = mongoose.schema;

var PracticalDataSchema = new Schema({
    title : String,
	name : String,
	description : String,
	url : String
},{collection:'practicals'});

var practicalData = mongoose.model('practicalData',PracticalDataSchema);

homeObj.loadAll = function loadAll(){
    practicalData.find().then(function(data){
        return data;
    });
}

module.exports = homeObj;