const router = require("express").Router();
const creds = require('../../../client/config/config');
var nodemailer = require('nodemailer');



var transport = {
    host:  'smtp.gmail.com',
    auth: {
      user: creds.USER,
      pass: creds.PASS
    }
  }
  
  
  var transporter = nodemailer.createTransport(transport)
  
  transporter.verify((error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Server is ready to take messages');
    }
  });
  
  router.route('/send').post((req, res, next) => {
    var name = req.body.name
    var email = req.body.email
    var message = req.body.message
    var content =  "You've been challenged to a meme off! Click <a href='https://safe-depths-86355.herokuapp.com/login'> here </a> to battle!"
  
    
    var mail = {
      from: name,
      to: email,  //Change to email address that you want to receive messages on
      subject: "It's a meme off!",
      html: content,
      
      
    }
  
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        res.json({
          msg: 'fail'
        })
      } else {
        res.json({
          msg: 'success'
        })
      }
    })
  });

  module.exports = router;