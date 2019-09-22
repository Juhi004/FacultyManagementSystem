const router = require('express').Router();
let Faculty = require('../models/faculty.model');

router.route('/').get((req, res) => {
  Faculty.find()
    .then(faculty => res.json(faculty))
    .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const department = req.body.department;

  const newFaculty = new Faculty({
    name,
    department,
  });

  newFaculty.save()
    .then(() => res.json('Faculty added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
