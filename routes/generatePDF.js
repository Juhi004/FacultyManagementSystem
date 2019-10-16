const router = require('express').Router();
const PDFDocument = require('pdfkit');
let Faculty = require('../models/faculty.model');
let Hod = require('../models/hod.model');
const User = require('../models/user.model');
const Issue = require('../models/issue.model');
const path = require('path');
const fs = require('fs');

function sendPDF(res)
{
    console.log('HI');
    var file = fs.createReadStream(path.resolve(__dirname+'/'+"../reports/report.pdf"));
    file.pipe(res);
}
function makePDF(req, res,callback)
{
  const doc = new PDFDocument();

  //Just edit this to generate a new Report everytime clicks on generateReport
  doc.pipe(fs.createWriteStream(path.resolve(__dirname + '/'+ "../reports/report.pdf")));
  doc
  .text('And here is some wrapped text...', 100, 300)
  .font('Times-Roman', 13)
  .moveDown()
  .text("I am feeling crazy ", {
    width: 412,
    align: 'justify',
    indent: 30,
    columns: 2,
    height: 300,
    ellipsis: true
  });

  doc.end();
  callback(res);
}
router.get('/',function(req, res){
  makePDF(req,res,sendPDF);
});

module.exports = router;
