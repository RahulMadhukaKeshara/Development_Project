const nodemailer = require("nodemailer");

const accountVerification = (details) => {

const url = `http://localhost:5000/users/emailVerification/${details.verifyLink}`;

let transporter = nodemailer.createTransport({

    service:'gmail',
    auth: {
      user: 'peacotclothing@gmail.com', // generated ethereal user
      pass: 'peacot123+*', // generated ethereal password
    },
  })

let mailOptions = {
    from:'peacotclothing@gmail.com',
    to:`${details.userEmail}`,
    subject:'Account Verification',
    html:`<h4>Click on this link here to verify your peacot account.</h4><br/>${url}`
}

transporter.sendMail(mailOptions,function(err,  info){
    if (err) {
        console.log(err)
    } else {
        console.log("Email Sent Succesfully" , info.response)
    }
})

}

module.exports = accountVerification;