const mongoose = require('mongoose');

const StuSchema = new mongoose.Schema({
    rollno:String,
    name:String,
    birthday: {
        type:Date
    },
    email: {
      type:String
    },       
    sex: String,
    
    

});

// modelname :Students
// Schema is  : StuSchema
const StuData = mongoose.model('StuData' , StuSchema);

module.exports = StuData;