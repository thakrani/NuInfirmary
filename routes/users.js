const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
//User Model
const User = require('../models/User');
const DashData = require('../models/Dashboard');
const StuData = require('../models/Students');



//Login page
router.get('/login' , (req,res) => res.render('login'));

//Register page
router.get('/register' , (req,res) => res.render('register'));





//Register Handle
router.post('/register',(req,res)=>{
    const { name, email,password , password2} = req.body;
    let errors =[];
    // check required fields
    if(!name||!email||!password||!password2){
        errors.push({msg : 'Please fill in all fields'})
    }
    //Check both passwords 
    if(password !== password2){
        errors.push({msg : 'Passwords do not match '})
    }
    // check password length
    if(password.length < 6){
        errors.push({msg : 'Password should be atleast 6 chars'});
    } 

    if(errors.length >0){
        res.render('register',{
            errors,
            name,
            email,
            password,
            password2
        });
    }
    else{
        //Validation passed
        User.findOne({ email : email })
        .then(user => {
            if(user){
                //USer Exists
                errors.push({ msg:'Email is already registered ' })
                res.render('register',{
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            }
            else{
                const newUser = new User({
                    name,
                    email,
                    password
                });

                // encrypting password
                bcrypt.genSalt(10,(err,salt) => 
                    bcrypt.hash(newUser.password,salt,(err,hash) =>{
                        if (err) throw err;
                        // setting password to hash
                        newUser.password = hash;
                        //save user
                        newUser.save()
                        .then(user =>{
                            req.flash('success_msg' , 'You are now registered');
                            res.redirect('/users/login');
                        })
                        .catch(err => console.log(err));
                }))
            }
        });
    }
});


// Login handle
router.post('/login',(req,res,next) =>{
    passport.authenticate('local',{
        successRedirect : '/dashboard',
        failureRedirect : '/users/login',
        failureFlash : true
    })(req,res,next);
});



//Logout handle
router.get('/logout',(req,res)=>{
    req.logout();
    req.flash('success_msg' , 'You are logged out');
    res.redirect('/users/login');
    // function preventBack(){window.history.forward();}
    // setTimeout("preventBack()", 0);
    // window.onunload=function(){null};
})


//Retrieve Data with name
router.post('/getsingle',(req,res)=>{
    var value=req.body.pName;
    var query = { name: value};
    DashData.find(query)
    .then((result)=>{
        if(result.length>0){
            //res.send(result);
            res.render('search',{data:result});
        }
        else{
            res.send("No Result Found!!");
        }
        
        //res.render('search',{data:result});
        //res.send(result);
    })
    .catch((err)=>{
        console.log(err);
    })
})

//Retrieve Data with enrollment

router.post('/getsingle1',(req,res)=>{
    var value=req.body.pName;
    var query = { rollno: value};



    DashData.find(query)
    .then((result)=>{
        if(result.length>0){
            //res.send(result);
            res.render('search',{data:result});
        }
        else{
            res.send("No Result Found!!");
        }
        
        //res.render('search',{data:result});
        //res.send(result);
    })
    .catch((err)=>{
        console.log(err);
    })
})

//Retrieve Data with month


router.post('/getsingle2',(req,res)=>{
    var value=req.body.pName;
    var start = new Date(2020,value-1,1)
    var temp = new Date(2020,value-1,31)

    // DashData.find(
    //     {date: {$gte: start, $lt: temp}}
        
    //     ).then((result) => {
    //     console.log(result)
    // })

    // DashData.find().then(
    //     (result) => {
    //         console.log(result)
    //     }
    // )
    
    var query = {date: {$gte: start, $lt: temp}};
    DashData.find(query)
    .then((result)=>{
        if(result.length>0){
            //res.send(result);
            res.render('search',{data:result});
        }
        else{
            res.send("No Result Found!!");
        }
        
        //res.render('search',{data:result});
        //res.send(result);
    })
    .catch((err)=>{
        console.log(err);
    })
})



module.exports = router;