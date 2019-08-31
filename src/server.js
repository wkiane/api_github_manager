require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

const app = express();

app.set('secretKey', 'nodeRestApi');

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true
});

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.use(routes);


function validateUser(req, res, next) {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
    if (err) {
      res.json({status:"error", message: err.message, data:null});
    }else{
      // add user id to request
      req.body.userId = decoded.id;
      next();
    }
  });
  
}

app.use(function(req, res, next) {
  let err = new Error('Not Found');
     err.status = 404;
     next(err);
});

app.use(function(err, req, res, next) {
  console.log(err);
  
   if(err.status === 404)
    res.status(404).json({message: "Not found"});
   else 
     res.status(500).json({message: "Something looks wrong :( !!!"});
});


app.listen(process.env.PORT || 3333, () => {
  console.log('node server listing on port 3333');
});
