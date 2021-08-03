const nodemailer = require("nodemailer");

const orderPlacedEmail = (emailDetails) => {

let transporter = nodemailer.createTransport({

    service:'gmail',
    auth: {
      user: 'peacotclothing@gmail.com', 
      pass: 'peacot123+*', 
    },
  })


let mailOptions = {
    from:'peacotclothing@gmail.com',
    to:`${emailDetails.order_User.user_Email}`,
    subject:'Order Placed!',
    html: `<h4>Your Order has been placed Succesfully...Your Order ID is ${emailDetails.order_ID}</h4><br/><h4 style="color:black;">Please find the purchase order here,<br/><br/></h4>`,
    attachments: [{
        filename: 'invoice.pdf',
        path: './invoice.pdf',
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

module.exports = orderPlacedEmail; 
    
    


   


    //     const options ={
    //         from:"pererakk_im17053@stu.kln.ac.lk",
    //         to:"kisalperera999@gmail.com",
    //         subject:"Medica - Purchase Order", 
    //         html:body1+res+"</table><br/>"+"Notes: "+req.body.notes+body2
    //     };
    
    //     trasnsporter.sendMail(options, function(err,info){
    //         if(err){console.log(err);}
    //         console.log(info);})