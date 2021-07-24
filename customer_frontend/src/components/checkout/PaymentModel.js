import React from 'react';
import jwtDecode from "jwt-decode";
import Axios from 'axios';
import Swal from 'sweetalert2';
import {useHistory} from 'react-router-dom';

function PaymentModel({orderDetails , orderTotal , orderItems , dateGap}) {

    const history = useHistory();
    const url = "http://localhost:5000/orders/add";
    const jwt = localStorage.getItem("token");
    let userEmail = jwtDecode(jwt).user_Email;
    let userID = jwtDecode(jwt)._id;

     let payment = {
          sandbox: true, // if the account is sandbox or real
          merchant_id: '1217735', // Replace your Merchant ID
          return_url: '',
          cancel_url: '',
          notify_url: '',
          order_id: "",//
          items: "",//
          amount: orderTotal, //
          currency: 'LKR',
          first_name: orderDetails.delivery_Fname,
          last_name: orderDetails.delivery_Lname,
          email: userEmail,
          phone: orderDetails.delivery_Contact,
          address: "",
          city: orderDetails.delivery_District,
          country: 'Sri Lanka',
          delivery_address: `${orderDetails.delivery_Address_1},${orderDetails.delivery_Address_2},${orderDetails.delivery_Address_3}`, // optional field
          delivery_city: orderDetails.delivery_District, // optional field
       };

        // Called when user completed the payment. It can be a successful payment or failure
        window.payhere.onCompleted = function onCompleted(orderId) {
        console.log("Payment completed. OrderID:" + orderId);
        //Note: validate the payment and show success or failure page to the customer
        const d = new Date();
        const date = d.toLocaleDateString();
        const setOrderID = d.getDate() + orderDetails.delivery_Contact + d.getHours() + d.getMinutes();

        const exDate = new Date();
        exDate.setDate(exDate.getDate() + dateGap)

  
         let dataSet = {
           order_User : userID,
           order_Items: orderItems,
           order_ID : setOrderID,
           payment_Method: orderDetails.payment_Method,
           order_Status: orderDetails.order_Status,
           order_Total : orderTotal,
           order_Placed_Date : date, 
           expected_Delivery_Date : exDate.toLocaleDateString(),
           actual_Delivery_Date : orderDetails.actual_Delivery_Date,
           delivery_Fname : orderDetails.delivery_Fname,
           delivery_Lname: orderDetails.delivery_Lname,
           delivery_Contact: orderDetails.delivery_Contact,
           delivery_Address_1: orderDetails.delivery_Address_1,
           delivery_Address_2: orderDetails.delivery_Address_2,
           delivery_Address_3: orderDetails.delivery_Address_3,
           delivery_District: orderDetails.delivery_District,
           delivery_Postal: orderDetails.delivery_Postal,
           delivery_Instructions: orderDetails.delivery_Instructions,
         }
         console.log("dataaaaaaaaaa",dateGap)
         console.log("dataaaaaaaaaa",exDate)
         console.log("dataaaaaaaaaa",dataSet)
         try {
            //  console.log(dataSet)
                Axios.post(
                    url,
                    dataSet,
        
                )
           .then((res) => {
               //console.log(res.data)
                if (res.data === "Order Placed!") {
                  Swal.fire({
                      icon: 'success',
                      title: 'Order Placed!',
                    })
                    history.push('/customer-orders/'+ userID);
  
              } else {
                  Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: 'Something went wrong!',
  
                    })
              }
             }
           );
        } catch (err) {
          console.log(err.res.data)
        }


        };

        // Called when user closes the payment without completing
            window.payhere.onDismissed = function onDismissed() {
            //Note: Prompt user to pay again or show an error page
            console.log("Payment dismissed");
        };

        // Called when error happens when initializing payment such as invalid parameters
        window.payhere.onError = function onError(error) {
            // Note: show an error page
            console.log("Error:"  + error);
        };

        function pay(e){
            e.preventDefault();
            window.payhere.startPayment(payment);
            //console.log(payment)
            // console.log(orderTotal)
            // console.log(orderDetails)
        }
    return (
        <>
        <button onClick={(e)=>pay(e)} className="add_product_category_form_btn1" >Proceed to Pay</button>
        </>
    )
}

export default PaymentModel;
