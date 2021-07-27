const niceInvoice = require("nice-invoice");

const invoice = async(order) => {

// console.log("Order Object7777777777777777",order);
//console.log("Order Object7777777777777777",order.delivery_Lname);
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
          country: "SriLanka",
          postal_code: order.delivery_Postal,
        },
        items: itemArr,
        subtotal: order.order_Total,
        total: parseInt(order.order_Total),
        order_number: order.order_ID,
        header:{
            company_name: "Peacot",
            company_logo: "logo.png",
            company_address: "Peacot , 147/A , Pliyandala, Horana"
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

