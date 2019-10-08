const router = require('express').Router();

let Issue = require('../models/issue.model');
let Faculty = require('../models/faculty.model');
let Hod = require('../models/hod.model');

//For updating the issue status from pending by HOD to accepted/rejected !!
//need to apply to check if its actually an HOD requesting and also that the status is pending by HOD in db too
//@TODO : I was working on this issue, only
//for updating issue
router.route('/issue').post((req, res) => {
  const requestObj = req.body;
  Issue.findById(requestObj._id,function(err,data){
    if(!err && data)
    {
      Issue.updateOne({_id : data._id},{status : requestObj.status},{strict: false},function(err,response) {
        if(!err)
        {
          res.status(200).json("Success");
        }else{
          res.status(500).json("Error"+err);
        }
      })
    }else{
      res.status(500).json("Error"+ err);
    }
  });

});

//For creating a  new issue
//need to apply to check if its actually an HOD requesting and also that the status is pending in db too
//or @JUHI, if we want to edit issue maybe the status can be pending by HOD too
//@TODO : I was working on this issue, only
//for updating issue
router.route('/issueCreate').post((req, res) => {
  const requestObj = req.body;
  Issue.create(requestObj,function(err,data){
    if(!err && data)
    {
      res.status(200).json(data);
    }else{
      res.status(500).json("Error"+ err);
    }
  });

});

//For updating the issue status to pending by HOD and submit a request
//need to apply to check if its actually an HOD requesting and also that the status is pending in db too
//or @JUHI, if we want to edit issue maybe the status can be pending by HOD too
//@TODO : I was working on this issue, only
//for updating issue
router.route('/issueReason').post((req, res) => {
  const requestObj = req.body;
  Issue.findById(requestObj._id,function(err,data){
    if(!err && data)
    {
      Issue.updateOne({_id : data._id},{status : requestObj.status,reason : requestObj.reason },{strict: false},function(err,response) {
        if(!err)
        {
          res.status(200).json("Success");
        }else{
          res.status(500).json("Error"+err);
        }
      })
    }else{
      res.status(500).json("Error"+ err);
    }
  });

});

//TODO : Add the password and username checking ? or not !
//check if actually sir is sending the requests or they are being sent by postman
router.route('/issueDataList').get((req, res) => {
  Faculty.find({},{"_id" : 0,"name" : 1,"department": 1},function(err,data){
    if(!err && data)
    {
      res.status(200).send(JSON.stringify({"departmentWiseFaculty" : data}));
    }else{
      res.status(500).json("Error"+ err);
    }
  });

});

router.route('/issues').get((req, res) => {
  Issue.find()
    .then(issues => res.json(issues))
    .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/issues').post((req, res) => {
  const department = req.body.department;
  const subject = req.body.subject;
  const date = Date(req.body.date);
  const time_slot = Number(req.body.time_slot);
  const reason = req.body.reason;
  const status = req.body.status;

  const newIssue = new Issue({
    department,
    subject,
    date,
    time,
    remarks,
    status,
  });

  newIssue.save()
    .then(() => res.json('Issue Added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});


//how to return only the id of the issue
router.route('/issues:id').get((req, res) => {
  Issue.find()
    .then(issues => res.json(issues))
    .catch(err => res.status(400).json('Error: '+ err));
});


router.route('/faculty').get((req, res) => {
  Faculty.find()
    .then(faculty => res.json(faculty))
    .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/faculty:id').get((req, res) => {
  Faculty.findById(req.params.id)
    .then(faculty => res.json(faculty))
    .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/faculty:id').put((req, res) => {
  Faculty.findById(req.params.id)
    .then(faculty => {
      //Need correction: aim to add new issue_id in the array and not replace the existing id with new one
      issue.issue_ids = [Number](req.body.department);


      faculty.save()
        .then(() => res.json('Faculty details updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/hod').get((req, res) => {
  Hod.find()
    .then(faculty => res.json(hod))
    .catch(err => res.status(400).json('Error: '+ err));
});

//Need to define a route to add dean's issues
//Need to define a route to add hod's issues


module.exports = router;
