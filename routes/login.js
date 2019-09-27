const router = require('express').Router();
const User = require('../models/user.model');
const Issue = require('../models/issue.model');

router.route('/').get((req, res) => {
  const email  = req.headers.email;
  const password = req.headers.password;
  let finalObjectToReturn = {};

User.find({$and: [{email:email}, {password:password}]},function(err,data){
    if(!err && data.length !==0)
    {
        finalObjectToReturn.username = data[0].username;
        finalObjectToReturn.email = data[0].email;
        finalObjectToReturn.password = data[0].password;
        finalObjectToReturn.dashCode = data[0].dashCode;

        Issue.find({faculty : data[0].username},function(err,data) {
          if(!err)
          {
              finalObjectToReturn.issues = data;
              res.send(JSON.stringify(finalObjectToReturn));
           }else{
            res.send(JSON.stringify({'Error': err}));
          }
        })
    }else{
      res.send(JSON.stringify({'Error':err}));
    }
});

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
