const router = require('express').Router();
const User = require('../models/user.model');
const Issue = require('../models/issue.model');

  var fl = 0;

router.route('/').get((req, res) => {
  //Mansi, complete it for me
  //@TODO : //sure, my dear madame

//I am ending request using headers only here , so no JSON actually used :( , but just see how to send JSON
//for JSON, you would have to do :  object = JSON.parse(req.body)
//these are headers, remove this later
  console.log(req.headers);
  const email  = req.headers.email;
  const password = req.headers.password;
  let finalObjectToReturn = {};


  User.find({$and: [{email:email}, {password:password}]})
    .then( (user) =>
      {
        console.log(user);
          fl = 1;
          console.log(fl);
        //Issue.findAll({faculty:user.username})
       //.then(issue => {
        //finalObjectToReturn.issue = issue;
        //add status codes
        //{faculty:user.username}
        //console.log(issue);
        //return issue;
    //})
    //.catch(err => res.status(400).json('Error: '+ err))
  })
    .catch(err => res.status(400).json('Error: '+ err));

    if(fl===1){
      Issue.findAll()
        .then(issue =>   res.send(JSON.stringify(issue)))
        .catch(err => res.status(400).json('Error: '+ err));

         console.log(issue);
    }

});

//{faculty:user.username}
//console.log(issue);
  module.exports = router;


  //now verify this and check whatever you want
  //and keep modifying the object, jaise if you get the department , do :

  //finalObjectToReturn.department = department;

  //Here will be the object you want to send to front end
  //finalObjectToReturn.Juhi = "This is gonna be okay";
  //finalObjectToReturn.email = email;
  //finalObjectToReturn.password = password;
  //return your response stuff too, just aise hi

//check this in frontend ka console.log(); Ctrl+Shift+I
//this is will show what I get in front end

  //res.json(finalObjectToReturn);
