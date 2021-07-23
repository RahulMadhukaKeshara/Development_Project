const nodemailer = require("nodemailer");

const orderPlaced = (emailDetails) => {

let transporter = nodemailer.createTransport({

    service:'gmail',
    auth: {
      user: 'peacotclothing@gmail.com', // generated ethereal user
      pass: 'peacot123+*', // generated ethereal password
    },
  })

  const body1='<h4 style="color:black;">Please find the purchase order here,<br/><br/></h4>'; 
  const body2='<br/><br/>Thank You!';

  var body3='<table border="2"><th>Item</th><th>Units</th>';
  emailDetails.order_Items.forEach(element => {

      body3=body3+'<tr><td>'+element.product.product_Name+'</td><td>'+element.unit_Price+'</td></tr>'
  })
//   resolved (body3) 

let mailOptions = {
    from:'peacotclothing@gmail.com',
    to:`${emailDetails.order_User.user_Email}`,
    subject:'Order Placed!',
    html: body1+ body3 +"</table><br/>"+"Notes: "+ body2
}

transporter.sendMail(mailOptions,function(err,  info){
    if (err) {
        console.log(err)
    } else {
        console.log("Email Sent Succesfully" , info.response)
    }
})

}

module.exports = orderPlaced; 
    
    


   


    //     const options ={
    //         from:"pererakk_im17053@stu.kln.ac.lk",
    //         to:"kisalperera999@gmail.com",
    //         subject:"Medica - Purchase Order", 
    //         html:body1+res+"</table><br/>"+"Notes: "+req.body.notes+body2
    //     };
    
    //     trasnsporter.sendMail(options, function(err,info){
    //         if(err){console.log(err);}
    //         console.log(info);})