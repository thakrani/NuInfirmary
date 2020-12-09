const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth')
//Dashboard model
const Dash = require('../models/Dashboard');
const StuData = require('../models/Students')

const { Router } = require('express');
const { render } = require('ejs');


//Welcome page
router.get('/' , (req,res) => res.render('welcome'));
//Dashboard
router.get('/dashboard' , ensureAuthenticated,(req,res) => 
res.render('dashboard',{
    name : req.user.name
}));

// //Dashboard handle
router.post('/precp' ,(req,res,next) => { 
    var symp1 = req.body.diseases[0]
    var symp2 = req.body.diseases[1]
    var symp3 = req.body.diseases[2]
    var symp4 = req.body.diseases[3]
    var symp5 = req.body.diseases[4]

    var finalsymp= ''
    var rendersymp = new Array();
    req.body.diseases.forEach(e => {
        if(typeof(e) != undefined && e != ''){
            finalsymp += e + '\n'
            rendersymp.push(e)
        }
    });


    // var qtyR=req.body.qty1
    // var qty2=req.body.qty2
    // var qty3=req.body.qty3
    // var qty4=req.body.qty4
    // var qty5=req.body.qty5
   



    var pre1 = req.body.Prescription[0]
    var pre2 = req.body.Prescription[1]
    var pre3 = req.body.Prescription[2]
    var pre4 = req.body.Prescription[3]
    var pre5 = req.body.Prescription[4]





    var finalPre = ''
    var renderPre = new Array();
    req.body.Prescription.forEach(e => {
        if(typeof(e) != undefined && e != ''){
            finalPre += e + '\n'
            renderPre.push(e)
        }
    });
    
    

    var item = {
        rollno : req.body.rollno,
        name : req.body.name,
        age : req.body.age,
        symptoms : finalsymp,
        psr : finalPre,
        sex : req.body.sex
    };
    var data = new Dash(item);
    //Saving data
    data.save();
    
    res.render('precp',{
        rollno : req.body.rollno,
        name : req.body.name,
        age : req.body.age,
        symptoms : finalsymp,
        rendersympfront: rendersymp,
        psr : finalPre,
        renderpresfront: renderPre,
        // qty: qtyx
    });
});

//Dashboard to Emergency
router.post('/emergency' ,(req,res,next) => { 
    var symp1 = req.body.diseases[0]
    var symp2 = req.body.diseases[1]
    var symp3 = req.body.diseases[2]
    var symp4 = req.body.diseases[3]
    var symp5 = req.body.diseases[4]

    var finalsymp= ''
    var rendersymp = new Array();
    req.body.diseases.forEach(e => {
        if(typeof(e) != undefined && e != ''){
            finalsymp += e + '\n'
            rendersymp.push(e)
        }
    });


   



    var pre1 = req.body.Prescription[0]
    var pre2 = req.body.Prescription[1]
    var pre3 = req.body.Prescription[2]
    var pre4 = req.body.Prescription[3]
    var pre5 = req.body.Prescription[4]





    var finalPre = ''
    var renderPre = new Array();
    req.body.Prescription.forEach(e => {
        if(typeof(e) != undefined && e != ''){
            finalPre += e + '\n'
            renderPre.push(e)
        }
    });
    var item = {
        rollno : req.body.rollno,
        name : req.body.name,
        age : req.body.age,
        symptoms : finalsymp,
        psr : finalPre,
        sex : req.body.sex,
        
    };
    var data = new Dash(item);
    //Saving data
    data.save();
    
    res.render('emergency',{
        rollno : req.body.rollno,
        name : req.body.name,
        age : req.body.age,
        symptoms : finalsymp,
        rendersympfront: rendersymp,
        psr : finalPre,
        renderpresfront: renderPre 
    });
});


//Dashboard to student form
router.post('/StudentForm' ,(req,res,next) => { 
    
    
    res.render('StudentForm');
});


// StudentForm to Display 
router.post('/display' ,(req,res,next) => { 
    var item = {
        rollno : req.body.rollno,
        name : req.body.name,
        sex : req.body.sex,
        email: req.body.email,
        birthday:req.body.dob
    };
    var data = new StuData(item);
    //Saving data
    data.save();
    
    res.render('display',{
        rollno : req.body.rollno,
        name : req.body.name,
        sex: req.body.sex,
        email: req.body.email,
        dob: req.body.dob

    });
});


//Dashboard to About us
router.get('/AboutUS' ,(req,res) => { 
    
    
    res.render('AboutUS');
});

module.exports = router;

