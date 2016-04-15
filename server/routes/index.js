var express=require('express');
var mongoose = require('mongoose');
var path=require('path');
var twentyUsers = require("./getUsers");
var Person = require('../../Person');

var router=express.Router();

router.get('/', function(request, response){
  response.sendFile(path.join(__dirname, '../public/views/index.html'));
});

router.get('/users', function(request, response) {
  Person.find({}, function(err, person) {
    if(err){
      console.log('error retreiving from DB');
      response.sendStatus(500);
    }
    response.send(person);
  });
});

router.get("/all", function(request, response) {
  response.send(twentyUsers());
});

router.delete("/deleteUsers/:id", function(request, response) {
  console.log("delete id", request.params.id);
  Person.findOneAndRemove({_id: request.params.id}, function(err, person){
    if (err){
      console.log(err);
      response.sendStatus(500);
    } else {
      console.log('Deleted user:', person);
      response.sendStatus(200);
    }
  });
});


module.exports=router;
