const router = require('express').Router();
let Order = require('../models/orders.model');
let User = require('../models/users.model');
let Product = require('../models/products.model');


//get all orders
router.route('/').get((req,res) => {
    Order.find()
    .then(orders => res.json(orders))
    .catch(err => res.status(400).json('Error: '+ err));
});

//get specific user's orders
router.route('/:id').get(async (req,res) => {
  
  try {
    let userOb = await User.findById(req.params.id)
    let orders = await Order.find({order_User : userOb}).populate({path : 'order_Items.product' , model : 'Product'})
    res.json(orders)
    
  } catch (error) {
    res.status(400).json('Error: '+ error)
  }
});

router.route('/add').post(async(req,res) => {

  let userOb = await User.findById(req.body.order_User)

   const order_User  = userOb;
   const order_Items = req.body.order_Items;
   const payment_Method = req.body.payment_Method;
   const order_Status = req.body.order_Status;
   const order_Total  = String(req.body.order_Total);
   const order_Placed_Date  = req.body.order_Placed_Date; 
   const expected_Delivery_Date  = req.body.actual_Delivery_Date;
   const actual_Delivery_Date  = req.body.expected_Delivery_Date;
   const delivery_Fname  = req.body.delivery_Fname;
   const delivery_Lname = req.body.delivery_Lname;
   const delivery_Contact = req.body.delivery_Contact;
   const delivery_Address_1 = req.body.delivery_Address_1;
   const delivery_Address_2 = req.body.delivery_Address_2;
   const delivery_Address_3 = req.body.delivery_Address_3;
   const delivery_District = req.body.delivery_District;
   const delivery_Postal = req.body.delivery_Postal;
   const delivery_Instructions = req.body.delivery_Instructions;
   const delivery_Member = req.body.delivery_Member;

   const newOrder = new Order({

     order_User,
     order_Items,
     payment_Method,
     order_Status,
     order_Total,
     order_Placed_Date,
     expected_Delivery_Date,
     actual_Delivery_Date,
     delivery_Fname,
     delivery_Lname,
     delivery_Contact,
     delivery_Address_1,
     delivery_Address_2,
     delivery_Address_3,
     delivery_District,
     delivery_Postal,
     delivery_Instructions,
     delivery_Member

   });

   newOrder.save()
   .then(() => res.json('Order Placed!'))
   .catch(err => res.status(400).json('Error: ' + err));


});

//display specific order of a specific user
router.route('/orderDetails').post(async (req,res) => {
  
   try {
     let userOb = await User.findById(req.body.userID)
     let orders = await Order.find({order_User : userOb}).populate({path : 'order_Items.product' , model : 'Product'})

     let orderOb = await orders.filter(c => c._id = req.body.orderID);
     res.json(orderOb[0])
    
   } catch (error) {
     res.status(400).json('Error: '+ error)
   }
});


  module.exports = router;