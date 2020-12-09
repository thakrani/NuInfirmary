const mongoose = require('mongoose');

const Dschema = new mongoose.Schema({
    rollno:String,
    name:String,
    age:Number,    
    symptoms: String,       
    psr: String,
    sex:String,
    date:{
        type : Date,
        default : Date.now
    },
    
    
    

});

// modelname :Dashboard
// Schema is  : Dschema
const dashData = mongoose.model('dashData' , Dschema);

module.exports = dashData;