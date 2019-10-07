const router = require('express').Router();
const User = require('../models/user.model');
const Issue = require('../models/issue.model');
const Faculty = require('../models/faculty.model')

router.route('/').get((req, res) => {
  const email  = req.headers.email;
  const password = req.headers.password;
  let finalObjectToReturn = {};

User.find({$and: [{email:email}, {password:password}]},function(err,data){
    if(!err && data.length !==0)
    {
        finalObjectToReturn.facultyName = data[0].username;
        finalObjectToReturn.email = data[0].email;
        finalObjectToReturn.password = data[0].password;
        finalObjectToReturn.dashCode = data[0].dashCode;

        //get the department too
        Faculty.find({name : data[0].username},function(err,data){
          if(!err && data.length !== 0)
          {
            finalObjectToReturn.department = data[0].department;
            let searchIssues = {};
            if(finalObjectToReturn.dashCode === 1)
            {
              //you are an HOD and you need the departments+your own issues, basically our own issues
              searchIssues = {department : data[0].department};
              finalObjectToReturn.position = "HOD";

            }else if(finalObjectToReturn.dashCode === 2){
              //you are a faculty and you need only your issues
              searchIssues = {faculty : data[0].name};
              finalObjectToReturn.position = "professor";

            }else{
              //you are the dean, you need all the issues
              searchIssues = {};
              finalObjectToReturn.position = "DEAN";
            }
            Issue.find(searchIssues,function(err,data) {
              if(!err)
              {
                  finalObjectToReturn.issues = data;
                  res.send(JSON.stringify(finalObjectToReturn));
               }else{
                 console.log("Error",err);
                res.send(JSON.stringify({'Error': err}));
              }
            })

          }else{
            console.log("Error",err);
            res.send(JSON.stringify({'Error':err}));
          }
        })
    }else{
      console.log("Error",err);
      res.send(JSON.stringify({'Error':err}));
    }
});

});

module.exports = router;
