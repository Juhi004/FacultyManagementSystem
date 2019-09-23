const router = require('express').Router();
let User = require('../models/user.model');

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

  //now verify this and check whatever you want
  //and keep modifying the object, jaise if you get the department , do :

  //finalObjectToReturn.department = department;

  //Here will be the object you want to send to front end
  finalObjectToReturn.Juhi = "This is gonna be okay";
  finalObjectToReturn.email = email;
  finalObjectToReturn.password = password;
  //return your response stuff too, just aise hi

//check this in frontend ka console.log(); Ctrl+Shift+I
//this is will show what I get in front end

  res.json(finalObjectToReturn);
});

module.exports = router;
