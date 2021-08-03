const nodemailer = require("nodemailer");

const orderStatusChangeEmail = (orderOB) => {

let mailOptions = "";

let transporter = nodemailer.createTransport({

    service:'gmail',
    auth: {
      user: 'peacotclothing@gmail.com', 
      pass: 'peacot123+*', 
    },
  })

  if (orderOB.order_Status === "Delivery Assigned") {

    mailOptions = {

        from:'peacotclothing@gmail.com',
        to:`${orderOB.order_User.user_Email}`,
        subject:'Delivery Assigned!',
        html:`<h4>Our Delivery Member ${orderOB.delivery_Member.user_Fname} ${orderOB.delivery_Member.user_Lname} has been assigned to deliver your order</h4><h4>Expected Delivery Date is ${orderOB.expected_Delivery_Date}</h4><h4>Please login to your peacot account for more details!!!</h4>`

    }
      
  } 
  else if(orderOB.order_Status === "On The Way") {

    mailOptions = {

        from:'peacotclothing@gmail.com',
        to:`${orderOB.order_User.user_Email}`,
        subject:'Delivery is On The Way!',
        html:`<h4>Our Delivery Member ${orderOB.delivery_Member.user_Fname} ${orderOB.delivery_Member.user_Lname} is On the way now for the Order under Order ID : ${orderOB.order_ID}</h4><br/><h5>Please login to your account for more details!!!</h5>`

    }
      
  }

  else if(orderOB.order_Status === "Delivered"){

    mailOptions = {

        from:'peacotclothing@gmail.com',
        to:`${orderOB.order_User.user_Email}`,
        subject:'Order Delivered!',
        html:`<h4>Order (Order ID : ${orderOB.order_ID}) has been delivered to ${orderOB.delivery_Fname} ${orderOB.delivery_Lname} on ${orderOB.actual_Delivery_Date}</h4><h4>Thanks for Shopping with Peacot!!!</h4>`

    }

  }
  
  else if(orderOB.order_Status === "Requested to Cancel"){

    mailOptions = {

        from:'peacotclothing@gmail.com',
        to:`${orderOB.order_User.user_Email}`,
        subject:'Cancel Request Placed!',
        html:`<h4>Cancel request placed on "Order ID: ${orderOB.order_ID}" as per your request.<h5>Our staff member will contact you soon!!!</h5>`

    }

  }

  else if(orderOB.order_Status === "Requested to Return"){

    mailOptions = {

        from:'peacotclothing@gmail.com',
        to:`${orderOB.order_User.user_Email}`,
        subject:'Return Request Placed!',
        html:`<h4>Return request placed on "Order ID: ${orderOB.order_ID}" as per your request.<h5>Our staff member will contact you soon!!!</h5>`

    }

  }

  else if(orderOB.order_Status === "Cancelled"){

    mailOptions = {

        from:'peacotclothing@gmail.com',
        to:`${orderOB.order_User.user_Email}`,
        subject:'Order Cancelled!',
        html:`<h4>Order that placed under "Order ID: ${orderOB.order_ID}" has been cancelled as per your request.<h4><h5>Thanks for shopping with Peacot!!!</>`

    }

  }

  else if(orderOB.order_Status === "Return Accepted"){

    mailOptions = {

        from:'peacotclothing@gmail.com',
        to:`${orderOB.order_User.user_Email}`,
        subject:'Return Request Accepted!',
        html:`<h4>Return request has been accepted on order ID : ${orderOB.order_ID}.</h4><h4>Our Delivery Member ${orderOB.delivery_Member.user_Fname} ${orderOB.delivery_Member.user_Lname} will be there soon to return the order!!!</h4>`

    }

  }

  else if(orderOB.order_Status === "Returned"){

    mailOptions = {

        from:'peacotclothing@gmail.com',
        to:`${orderOB.order_User.user_Email}`,
        subject:'Order Returned!',
        html:`<h4>Order that placed under 'Order ID: ${orderOB.order_ID}' has been returned as per your request.</h4><h4>Thanks for shopping with Peacot!!!</h4>`

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