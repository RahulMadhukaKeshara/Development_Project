const nodemailer = require("nodemailer");

const email = () => {

let transporter = nodemailer.createTransport({

    service:'gmail',
    auth: {
      user: 'peacotclothing@gmail.com', // generated ethereal user
      pass: 'peacot123+*', // generated ethereal password
    },
  })


let mailOptions = {
    from:'peacotclothing@gmail.com',
    to:'rahulkeshara@gmail.com',
    subject:'Hello World',
    text:'This is Body'
}

transporter.sendMail(mailOptions,function(err,  info){
    if (err) {
        console.log(err)
    } else {
        console.log("Email Sent Succesfully" , info.response)
    }
})

}

module.exports = email;