const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const app = express();


// passport config
require('./config/passport')(passport);
//database

const db = require('./config/keys').MongoURI;

//connect to mongodb
mongoose.connect(db, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
  .then(() => console.log("mongodb connected ..."))
  .catch(err => console.log(err));

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');


//BodyParser
app.use(express.urlencoded({ extended: true }));

// Express session middleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());



//connecting flash messages
app.use(flash());

//global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();

})

var path = require('path');
app.use(express.static(path.join(__dirname, "/public")));

//Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.get('/', function (request, response) {
  return res.redirect('/precp')
})
app.get('/precp', function (req, res) {
  return res.render('precp.ejs', {
    rollno: req.body.rollno,
    name: req.body.name
  });
})



const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on ${PORT}`));


