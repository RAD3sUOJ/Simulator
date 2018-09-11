var homeObj = {};       //for export functions

var mongoose = require('mongoose');
mongoose.connect("localhost:27017/simulator");

var schema = mongoose.schema;

var PracticalDataSchema = new schema({
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