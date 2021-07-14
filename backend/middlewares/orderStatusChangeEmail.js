const nodemailer = require("nodemailer");

const orderStatusChangeEmail = (orderOB) => {

let mailOptions = "";

let transporter = nodemailer.createTransport({

    service:'gmail',
    auth: {
      user: 'peacotclothing@gmail.com', // generated ethereal user
      pass: 'peacot123+*', // generated ethereal password
    },
  })

  if (orderOB.order_Status === "Delivery Assigned") {

    mailOptions = {

        from:'peacotclothing@gmail.com',
        to:`${orderOB.order_User.user_Email}`,
        subject:'Delivery Assigned!',
        text:`Our Delivery Member ${orderOB.delivery_Member.user_Fname} ${orderOB.delivery_Member.user_Lname} has been assigned to deliver your order.Expected Delivery Date is ${orderOB.expected_Delivery_Date}. Please login to your account for more details!!!`

    }
      
  } 
  else if(orderOB.order_Status === "On The Way") {

    mailOptions = {

        from:'peacotclothing@gmail.com',
        to:`${orderOB.order_User.user_Email}`,
        subject:'Delivery is On The Way!',
        text:`Our Delivery Member ${orderOB.delivery_Member.user_Fname} ${orderOB.delivery_Member.user_Lname} is On the way now. Please login to your account for more details!!!`

    }
      
  }

  else if(orderOB.order_Status === "Delivered"){

    mailOptions = {

        from:'peacotclothing@gmail.com',
        to:`${orderOB.order_User.user_Email}`,
        subject:'Order Delivered!',
        text:`Order has been delivered to ${orderOB.delivery_Fname} ${orderOB.delivery_Lname} on ${orderOB.actual_Delivery_Date}. Thanks for Shopping with Us!!!`

    }

  }
  
  else if(orderOB.order_Status === "Requested to Cancel"){

    mailOptions = {

        from:'peacotclothing@gmail.com',
        to:`${orderOB.order_User.user_Email}`,
        subject:'Cancel Request Placed!',
        text:`Cancel request placed on 'Order ID: ${orderOB._id}' as per your request. Our staff member will contact you soon!!! `

    }

  }

  else if(orderOB.order_Status === "Requested to Return"){

    mailOptions = {

        from:'peacotclothing@gmail.com',
        to:`${orderOB.order_User.user_Email}`,
        subject:'Return Request Placed!',
        text:`Return request placed on 'Order ID: ${orderOB._id}' as per your request. Our staff member will contact you soon!!! `

    }

  }

  else if(orderOB.order_Status === "Cancelled"){

    mailOptions = {

        from:'peacotclothing@gmail.com',
        to:`${orderOB.order_User.user_Email}`,
        subject:'Order Cancelled!',
        text:`Order that placed under 'Order ID: ${orderOB._id}' has been cancelled as per your request.Thanks for shopping with Us!!!`

    }

  }

  else if(orderOB.order_Status === "Return Accepted"){

    mailOptions = {

        from:'peacotclothing@gmail.com',
        to:`${orderOB.order_User.user_Email}`,
        subject:'Return Request Accepted!',
        text:`Return request has been accepted on order ID : ${orderOB._id}.Our Delivery Member ${orderOB.delivery_Member.user_Fname} ${orderOB.delivery_Member.user_Lname} will be there soon to return the order!!!`

    }

  }

  else if(orderOB.order_Status === "Returned"){

    mailOptions = {

        from:'peacotclothing@gmail.com',
        to:`${orderOB.order_User.user_Email}`,
        subject:'Order Returned!',
        text:`Order that placed under 'Order ID: ${orderOB._id}' has been returned as per your request.Thanks for shopping with Us!!!`

    }

  }

transporter.sendMail(mailOptions,function(err,  info){
    if (err) {
        console.log(err)
    } else {
        console.log("Email Sent Succesfully" , info.response)
    }
})

}

module.exports = orderStatusChangeEmail;