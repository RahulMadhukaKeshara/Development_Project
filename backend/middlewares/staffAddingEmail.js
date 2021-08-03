const nodemailer = require("nodemailer");

const staffAddingEmail = (details) => {


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
    subject:'Account Created',
    html:`<h4>Congradulations!!! you are now in peacot family as a Delivery Member.</h4><h4>This is your user email and password.</h4><br/>
         <h4>Please change your password after the first login</h4>
         <br/><h4>User Email : ${details.userEmail}</h4><h4>Password : ${details.password}</h4>`
}

transporter.sendMail(mailOptions,function(err,  info){
    if (err) {
        console.log(err)
    } else {
        console.log("Email Sent Succesfully" , info.response)
    }
})

}

module.exports = staffAddingEmail;