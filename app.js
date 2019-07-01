const express = require('express');
const app = express();
const routes = require('./routes');
const port = 3000;
const cors = require('cors');

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(cors());
app.use('/', routes)

const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/project'
mongoose.connect(url, {useNewUrlParser: true}, (err) => {
  if(err) {
    console.log(err)
  }
  else {
    console.log('mongoose connected')
  }
})

app.use(function(err,req,res,next){
  if(err.code === 404) {
    res.status(404).json({ message: 'Resource not found' })
  } else if(err.name === 'ValidationError') {
    res.status(500).json({ message: err.message })
  } else {
    const message = err.message
    const status = err.code || 500
    res.status(status).json({ message: message })
  }
});

app.listen(port, () => console.log(`listening on port port`))

//install axios, bcrypt, cors, dotenv, express, jwt, mongoose