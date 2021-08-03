const niceInvoice = require("nice-invoice");

const invoice = async(order) => {


   let itemArr = [];
   let count = 1;
    order.order_Items.forEach(element => {

      itemArr.push({
            item: count ,
            description: element.product.product_Name,
            quantity: element.quantity,
            price: parseFloat(element.unit_Price), 
            tax: ""
      })

      count = count + 1;
      
    });

    let invoiceDetail = {
        shipping: {
          name: order.delivery_Fname + " " + order.delivery_Lname,
          address: order.delivery_Address_1 + ", " + order.delivery_Address_2 + ", " + order.delivery_Address_3,
          city: order.delivery_District,
          state: "Srilanka",
          country: "",
          postal_code: order.delivery_Postal,
        },
        items: itemArr,
        subtotal: order.order_Total,
        total: parseInt(order.order_Total),
        order_number: order.order_ID,
        header:{
            company_name: "Peacot",
            company_logo: "logo.png",
            company_address: "Peacot , 354/A , Ananda Maithri Mw, Bellapitiya, Horana"
        },
        footer:{
          text: `${order.payment_Method === "Online Payment" ? ("Our Delivery Member will deliver the product to your doorstep..."):("Our Delivery Member will collect your payment...")}`,
        },
        currency_symbol:"Rs. ", 
        date: {
          billing_date: order.order_Placed_Date,
          
          due_date: `${order.payment_Method === "Online Payment" ? ("Payment Done"):(order.expected_Delivery_Date)}`,
        }
    };
     await niceInvoice(invoiceDetail, 'invoice.pdf');

}

module.exports = invoice;

