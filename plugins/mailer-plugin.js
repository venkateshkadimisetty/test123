var nodemailer = require('nodemailer');
var config = require('./../config/config.js');

module.exports={
    sendmail: function (memberId) {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                   user: config.MAIL_USERNAME,
                   pass: config.MAIL_PASSWORD
               }
           });
        
           const mailOptions = {
            from: config.MAIL_USERNAME, // sender address
            to: config.MAIL_USERNAME, // list of receivers
            subject: 'Registration', // Subject line
            html: '<h1>Registered Successfully!!!</h1><p>Hi,<br>you have registered in library manager successfully with memberId: <b>'+memberId+'</b></p>'// plain text body
          };
        
          transporter.sendMail(mailOptions, function (err, info) {
            if(err)
              console.log(err)
            else
              console.log(info);
         });
    }
}

