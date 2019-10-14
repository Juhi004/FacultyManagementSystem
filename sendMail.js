var nodemailer = require('nodemailer');

var sendMail = {};
sendMail.sendMail = function(reciever){
  var transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: false,
  port: 465,
  auth: {
    user: 'aqac.igdtuw@gmail.com',
    pass: 'juhimansi'
  },
  tls:{
        rejectUnauthorized:false
    }
  });

  var mailOptions = {
  from: 'aqac.igdtuw@gmail.com',
  to: reciever,
  subject: 'Alert from AQAC-igdtuw',
  text: 'Some activity has occured and it needs your attention. Kindly login in your Faculty Management System Account to review it.'
  };

  transporter.sendMail(mailOptions, function(error, info){
  if(error){
    console.log("Email not sent due to the error: " +error);
  }else{
    console.log('Email sent: '+info.response);
  }
  });
}
module.exports = sendMail;
