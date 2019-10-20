const router = require('express').Router();
const User = require('../models/user.model');
const Issue = require('../models/issue.model');
const Faculty = require('../models/faculty.model')
const crypto = require('crypto');

router.route('/').get((req, res) => {
  const email  = req.headers.email;
  const password = req.headers.password;
  let finalObjectToReturn = {};
  const hashedPassword = crypto.createHmac('sha256', "secret").update(password).digest('hex');
User.find({$and: [{email:email}, {password:hashedPassword}]},function(err,data){
    if(!err && data.length !==0)
    {
        finalObjectToReturn.facultyName = data[0].username;
        finalObjectToReturn.email = data[0].email;
        //finalObjectToReturn.password = data[0].password;
        //finalObjectToReturn.password = crypto.createHmac('sha256', "secret").update(data[0].password).digest('hex');
        finalObjectToReturn.dashCode = data[0].dashCode;

        //get the department too
        Faculty.find({name : data[0].username},function(err,resData){
          if(!err && resData.length !== 0)
          {
            finalObjectToReturn.department = resData[0].department;
            let searchIssues = {};
            if(finalObjectToReturn.dashCode === 1)
            {
              //you are an HOD and you need the departments+your own issues, basically our own issues
              searchIssues = {department : resData[0].department};
              finalObjectToReturn.position = "HOD";

            }else if(finalObjectToReturn.dashCode === 2){
              //you are a faculty and you need only your issues
              searchIssues = {facultyName : resData[0].name};
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
