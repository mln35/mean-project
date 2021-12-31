const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: 'mean.bootcamp@gmail.com',
    pass: 'mean.bootcamp.2021'
  },
  secure: true
});//
exports.sendMail =(dest, verificationToken,type) => {

    const port = process.env.PORT || 8080;
    let url = '';
    let subject = '';
    let html = '';
    if(type === 'verify'){
      url = `http://localhost:${port}/user/verify/${verificationToken}`
      subject = 'MEAN-PROJECT Account Activation';
      html = `Please Click <a href = '${url}'>here</a> to confirm your email.`;
    }
    else if(type === 'reset'){
      url = `http://localhost:${port}/user/reset/${verificationToken}`
      subject = 'MEAN-PROJECT Password reset';
      html = `Please follow <a href = '${url}'>this</a> and provide new password.`;
    }

    const mailOptions = {
      from: 'mean.bootcamp@gmail.com',
      to: dest,
      subject: subject,
      html: html
    };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    });
    
}
