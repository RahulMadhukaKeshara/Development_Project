const niceInvoice = require("nice-invoice");

const invoice = async(order) => {

// console.log("Order Object7777777777777777",order);
//console.log("Order Object7777777777777777",order.delivery_Lname);

    let invoiceDetail = {
        shipping: {
          name: order.delivery_Fname + " " + order.delivery_Fname,
          address: order.delivery_Address_1 + ", " + order.delivery_Address_2 + ", " + order.delivery_Address_3,
          city: order.delivery_District,
          state: "Srilanka",
          country: "SriLanka",
          postal_code: order.delivery_Postal,
        },
        items: [
          {
            item: "Chair",
            description: "Wooden chair",
            quantity: 1,
            price: 50.00, 
            tax: "10%"
          },
          {
            item: "Watch",
            description: "Wall watch for office",
            quantity: 2,
            price: 30.00,
            tax: "10%"
          },
          {
            item: "Water Glass Set",
            description: "Water glass set for office",
            quantity: 1,
            price: 35.00,
            tax: ""
          }
        ],
        subtotal: order.order_Total,
        total: parseInt(order.order_Total),
        order_number: order.order_ID,
        header:{
            company_name: "Peacot",
            company_logo: "logo.png",
            company_address: "Peacot. 123 William Street 1th Floor New York, NY 123456"
        },
        footer:{
          text: "Any footer text - you can add any text here"
        },
        currency_symbol:"Rs. ", 
        date: {
          billing_date: order.order_Placed_Date,
          due_date: order.order_Placed_Date,
        }
    };
     await niceInvoice(invoiceDetail, 'invoice.pdf');

}

module.exports = invoice;

