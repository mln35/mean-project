const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: 'meanpjt@gmail.com',
    pass: 'meanpjt2021'
  },
  secure: true
});//
exports.sendMail =(dest, verificationToken) => {
    const port = process.env.PORT || 8080;
    const url = `http://localhost:${port}/user/verify/${verificationToken}`
    const mailOptions = {
    from: 'meanpjt@gmail.com',
    to: dest,
    subject: 'MEAN-PROJECT Account Activation',
    html: `Please Click <a href = '${url}'>here</a> to confirm your email.`
    };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    });
    
}
exports.verifyNewEmail=(dest, confirmCode) => {
  const port = process.env.PORT || 8080;
  const url = `http://localhost:${port}/user/profile/update/${confirmCode}`
  const mailOptions = {
  from: 'meanpjt@gmail.com',
  to: dest,
  subject: 'MEAN-PROJECT Account Update',
  html: `<span>Please Enter the code</span>
  <a href = '${url}'>here</a> to confirm your email.`
  };

  transporter.sendMail(mailOptions, function(error, info){
  if (error) {
      console.log(error);
  } else {
      console.log('Email sent: ' + info.response);
  }
  });
  
}