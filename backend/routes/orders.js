const router = require('express').Router();
let Order = require('../models/orders.model');
let User = require('../models/users.model');
let Product = require('../models/products.model');
let Cart = require('../models/carts.model');
let sendOrderPlacedEmail = require('../middlewares/orderPlacedEmail');
let OrderStatusChangeEmail = require('../middlewares/orderStatusChangeEmail');
let invoiceGenerate = require('../middlewares/invoice');



//get all orders
router.route('/').get((req,res) => {
    Order.find().populate([{ path: 'order_Items.product', model: 'Product'}, { path: 'order_User', model: 'User'} ,{ path: 'delivery_Member', model: 'User'}])
    .then(orders => res.json(orders))
    .catch(err => res.status(400).json('Error: '+ err));
});

//get specific user's orders
router.route('/:id').get(async (req,res) => {
  
  try {
    let userOb = await User.findById(req.params.id)
    let orders = await Order.find({order_User : userOb}).populate([{ path: 'order_Items.product', model: 'Product'}, { path: 'order_User', model: 'User'} ,{ path: 'delivery_Member', model: 'User'}])
    
    //populate({path : 'order_Items.product' , model : 'Product'})
    res.json(orders)
    
  } catch (error) {
    res.status(400).json('Error: '+ error)
  }
});

router.route('/add').post(async(req,res) => {

  try {
    let userOb = await User.findOne({ _id : req.body.order_User})

    const order_User  = userOb;
    const order_Items = req.body.order_Items;
    const payment_Method = req.body.payment_Method;
    const order_Status = req.body.order_Status;
    const order_Total  = String(req.body.order_Total);
    const order_Placed_Date  = req.body.order_Placed_Date; 
    const expected_Delivery_Date  = req.body.expected_Delivery_Date;
    const actual_Delivery_Date  = req.body.actual_Delivery_Date;
    const delivery_Fname  = req.body.delivery_Fname;
    const delivery_Lname = req.body.delivery_Lname;
    const delivery_Contact = req.body.delivery_Contact;
    const delivery_Address_1 = req.body.delivery_Address_1;
    const delivery_Address_2 = req.body.delivery_Address_2;
    const delivery_Address_3 = req.body.delivery_Address_3;
    const delivery_District = req.body.delivery_District;
    const delivery_Postal = req.body.delivery_Postal;
    const delivery_Instructions = req.body.delivery_Instructions;
 
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
 
    });
 
    await newOrder.save();
    // sendOrderPlacedEmail(newOrder);
    
    let cartOb = await Cart.findOne({cart_User : userOb}).populate({path : 'cart_Items.product' , model : 'Product'});
    //console.log(cartOb)
     cartOb.cart_Items.forEach(async element => {
      //console.log(element.product._id)
      let productOb =  await Product.findById(element.product._id)
      productOb.product_Stock.forEach(item => {
        if(element.color === item.color){

            switch (element.size) {
              case "S":
                item.s_qty = parseInt(item.s_qty) - parseInt(element.quantity);
                break;

                case "XS":
                  item.xs_qty = parseInt(item.xs_qty) - parseInt(element.quantity);
                  break;
                  
                  case "M":
                    item.m_qty = parseInt(item.m_qty) - parseInt(element.quantity);
                    break;

                    case "L":
                      item.l_qty = parseInt(item.l_qty) - parseInt(element.quantity);
                      break;

                      case "XL":
                        item.xl_qty = parseInt(item.xl_qty) - parseInt(element.quantity);
                        break;

                        case "XXL":
                          item.xxl_qty = parseInt(item.xxl_qty) - parseInt(element.quantity);
                          break;
            
              default:
                break;


            }

        }
      });

      productOb.save()

     });

   let newCart = []
   cartOb.cart_Items = newCart;
   cartOb.save()

    res.json('Order Placed!')
  } catch (error) {
    res.status(400).json('Error: ' + error)
  }



});

//display specific order
router.route('/orderDetails/:id').get(async (req,res) => {
  
   try {

     let orderOb = await Order.findById(req.params.id).populate([{ path: 'order_Items.product', model: 'Product'}, { path: 'order_User', model: 'User'} ,{ path: 'delivery_Member', model: 'User'}])
     res.json(orderOb)
    //console.log(orders)

    
   } catch (error) {
     res.status(400).json('Error: '+ error)
   }
});

//update order status
router.route('/orderStatus/update/:id').post(async(req,res) => {

  try {
    
    let order = await Order.findById(req.params.id).populate([{path : 'order_User' , model : 'User'},{path : 'delivery_Member' , model : 'User'}]);
    if(req.body.order_Status === "Delivered"){
      let date = new Date();
      order.actual_Delivery_Date = date.toLocaleDateString();
    }
    if((req.body.order_Status === "Returned")||(req.body.order_Status === "Cancelled")){

      order.order_Items.forEach(async element => {
        //console.log(element.product._id)
        let productOb =  await Product.findById(element.product._id)
        productOb.product_Stock.forEach(item => {
          if(element.color === item.color){
  
              switch (element.size) {
                case "S":
                  item.s_qty = parseInt(item.s_qty) + parseInt(element.quantity);
                  break;
  
                  case "XS":
                    item.xs_qty = parseInt(item.xs_qty) + parseInt(element.quantity);
                    break;
                    
                    case "M":
                      item.m_qty = parseInt(item.m_qty) + parseInt(element.quantity);
                      break;
  
                      case "L":
                        item.l_qty = parseInt(item.l_qty) + parseInt(element.quantity);
                        break;
  
                        case "XL":
                          item.xl_qty = parseInt(item.xl_qty) + parseInt(element.quantity);
                          break;
  
                          case "XXL":
                            item.xxl_qty = parseInt(item.xxl_qty) + parseInt(element.quantity);
                            break;
              
                default:
                  break;
  
  
              }
  
          }
        });
  
        productOb.save()
  
       }); 

    }
    order.order_Status = req.body.order_Status;
    order.save();
    OrderStatusChangeEmail(order);
    res.json('Order Status Updated!')

  } catch (error) {
   
    res.status(400).json('Error: '+ error)

  }
});

//assign delivery member
router.route('/assignMember/update/:id').post(async(req,res) => {

  try {

    let orderOb = await Order.findById(req.params.id).populate({path : 'order_User' , model : 'User'});
    let delMemberOb = await User.findById(req.body.delivery_Member);
 
    orderOb.delivery_Member = delMemberOb;
    orderOb.order_Status = req.body.order_Status;
    await  orderOb.save();

    let orderDetails = await Order.findById(req.params.id).populate([{path : 'order_User' , model : 'User'},{path : 'delivery_Member' , model : 'User'}]);

    OrderStatusChangeEmail(orderDetails);
    res.json('Member Assigned!')
   
  } catch (error) {
    res.status(400).json('Error: '+ error)
  }

 });

 //get deliveries related to a delivery member
router.route('/assignedOrders/:id').get(async(req,res) => {

  try {
    let userOb = await User.findById(req.params.id)
    let orders = await Order.find({delivery_Member : userOb}).populate([{ path: 'order_Items.product', model: 'Product'}, { path: 'order_User', model: 'User'} ,{ path: 'delivery_Member', model: 'User'}])
    res.json(orders)
  } catch (error) {
    res.status(400).json('Error: '+ error)
  }

});

 //get ongoing deliveries related to a delivery member
 router.route('/ongoingOrders/:id').get(async(req,res) => {

  try {
    let userOb = await User.findById(req.params.id)
    let orders = await Order.find({delivery_Member : userOb}).populate([{ path: 'order_Items.product', model: 'Product'}, { path: 'order_User', model: 'User'} ,{ path: 'delivery_Member', model: 'User'}])
    let ongoing = [];
    orders.forEach(element => {
      if((element.order_Status != "Delivered")&&(element.order_Status != "Cancelled")&&(element.order_Status != "Returned")){
        ongoing.push(element);
      }
    });
    res.json(ongoing)
  } catch (error) {
    res.status(400).json('Error: '+ error)
  }

});



  module.exports = router;