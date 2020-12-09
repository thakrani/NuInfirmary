const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
//User Model
const User = require('../models/User');
const DashData = require('../models/Dashboard');
const StuData = require('../models/Students');



function getDetails(itemName) {
    alert('getDetails started')
    var value=itemName;
    var query = { rollno: value};
    StuData.find(query)
    .then((result)=>{
      if(result.length>0){
        alert('dataFound')
     }
    })
  }


function displayDetails() {
	document.getElementById("name").value=JSON.stringify('<%=data.name%>');
}