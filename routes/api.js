const router = require('express').Router();

let Issue = require('../models/issue.model');
let Faculty = require('../models/faculty.model');
let Hod = require('../models/hod.model');

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
    time_slot,
    reason,
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

//for updating issue
router.route('/issues:id').put((req, res) => {
  Issue.findById(req.params.id)
    .then(user => {
      issue.department = req.body.department;
      issue.subject = req.body.subject;
      issue.date = Date(req.body.date);
      issue.time_slot = Number(req.body.time_slot);
      issue.reason = req.body.reason;
      issue.status = req.body.status;

      issue.save()
        .then(() => res.json('Issue updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
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
