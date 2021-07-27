const nodemailer = require("nodemailer");

const invoiceMail = () => {

//const url = `http://localhost:5000/users/passwordReset/${details.resetLink}`;

let transporter = nodemailer.createTransport({

    service:'gmail',
    auth: {
      user: 'peacotclothing@gmail.com', // generated ethereal user
      pass: 'peacot123+*', // generated ethereal password
    },
  })

let mailOptions = {
    from:'peacotclothing@gmail.com',
    to:`rahulkeshara@gmail.com`,
    subject:'Password Reset',
    text:`Click on this link here to reset the password of your peacot account.`,
    attachments: [{
        filename: 'invoice.pdf',
        path: './invoice.pdf',
        // contentType: 'application/pdf'
      }]
}

transporter.sendMail(mailOptions,function(err,  info){
    if (err) {
        console.log(err)
    } else {
        console.log("Email Sent Succesfully" , info.response)
    }
})

}

module.exports = invoiceMail;