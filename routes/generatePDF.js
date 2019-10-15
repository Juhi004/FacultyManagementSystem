const router = require('express').Router();
const PDFDocument = require('pdfkit');
let Faculty = require('../models/faculty.model');
let Hod = require('../models/hod.model');
const User = require('../models/user.model');
const Issue = require('../models/issue.model');


router.route('/').post((req, res) => {
  const doc = new PDFDocument();
  let filename = "mansi";
  // Stripping special characters
  filename = encodeURIComponent(filename) + '.pdf';
  // Setting response to 'attachment' (download).
  // If you use 'inline' here it will automatically open the PDF
  res.setHeader('Content-type', 'application/pdf');
  res.setHeader('Access-Control-Allow-Origin', '*');
  //res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
  res.setHeader('Content-disposition', 'attachment; filename="mansi.pdf"');
  //res.setHeader('Content-type', 'application/pdf');
  const content = "This is a test";
  doc.y = 300;
  doc.text(content, 50, 50);
  doc.write(filename);
  doc.end();
  //doc.write(filename);
  //res.send();
});

module.exports = router;
