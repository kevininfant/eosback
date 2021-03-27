const express = require('express');
const bodyParser = require('body-parser');
const passport  = require('passport');
const pe = require('parse-error');
const cors = require('cors');
const api = require('./routes/api')



const app = express();

const CONFIG = require('./config/config');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

//Passport
app.use(passport.initialize());

//Log Env
console.log("Environment:",CONFIG.app)
//DATABASE

// CORS
app.use(cors());

app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
    
    if (err.status === 404) {
        res.status(404).json({message: err.message})
    } else {
        res.status(500).json({message: err.message})
    }
  
});


module.exports = app;
