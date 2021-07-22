const router = require('express').Router();
let Cart = require('../models/carts.model');
let User = require('../models/users.model');
let Product = require('../models/products.model');


//add items to the cart
router.route('/add').post(async(req,res) => {

      let userOb = await User.findById(req.body.cart_User)
      let productOb = await Product.findById(req.body.cart_Items.product)
      let cartOb = await Cart.findOne({cart_User : userOb})

      cartOb.cart_Items.push({
           product :  productOb,
           color :  req.body.cart_Items.color,
           quantity : req.body.cart_Items.quantity,
           size : req.body.cart_Items.size,
           unit_Price : req.body.cart_Items.unit_Price,
      })

        cartOb.save()
        .then(() => res.json('Item Added!'))
        .catch(err => res.status(400).json('Error: ' + err));

});

//get specific cart item details
router.route('/getcartitem').post(async(req,res)=> {

  try {
    let userOb = await User.findById(req.body.userID)
    let cartOb = await Cart.findOne({cart_User : userOb}).populate({path : 'cart_Items.product' , model : 'Product'})
    let cartItem;
    cartOb.cart_Items.forEach(element => {

      if(element._id == req.body.itemID){
        cartItem = element
      }
      
    });

    res.json(cartItem);
    
  } catch (error) {
    res.status(400).json('Error: '+ error)
  }


});

//get all carts
router.route('/').get((req,res) => {
  Cart.find()
  .then(cart => res.json(cart))
  .catch(err => res.status(400).json('Error: '+ err));
});

//get specific cart
router.route('/:id').get(async (req,res) => {
  
  try {
    let userOb = await User.findById(req.params.id)
    let cartOb = await Cart.findOne({cart_User : userOb}).populate({path : 'cart_Items.product' , model : 'Product'})
    res.json(cartOb)
    
  } catch (error) {
    res.status(400).json('Error: '+ error)
  }
});

//remove cart items 
router.route('/remove').post(async (req,res) => {

  console.log(req.body)
  
   try {
     let userOb = await User.findById(req.body.userID)
     let cartOb = await Cart.findOne({cart_User : userOb}).populate({path : 'cart_Items.product' , model : 'Product'})

     let newCart = cartOb.cart_Items.filter(c => {
        if(c._id != req.body.itemID) return true
     })
     cartOb.cart_Items = newCart
     cartOb.save()
     res.json('Item Deleted')
    
   } catch (error) {
     res.status(400).json('Error: '+ error)
   }
});


//update cart items
router.route('/update').post(async(req,res)=>{

  try {
    
    let userOb = await User.findById(req.body.cart_User);
    let productOb = await Product.findById(req.body.cart_Items.product);
    let cartOb = await Cart.findOne({cart_User : userOb}).populate({path : 'cart_Items.product' , model : 'Product'});

    let newCart = cartOb.cart_Items.filter(c => {
      if(c._id != req.body.itemID) return true
   });

   cartOb.cart_Items = newCart;

   cartOb.cart_Items.push({
    product :  productOb,
    color :  req.body.cart_Items.color,
    quantity : req.body.cart_Items.quantity,
    size : req.body.cart_Items.size,
    unit_Price : req.body.cart_Items.unit_Price,
})

cartOb.save()
res.json('Item Updated!')


  } catch (error) {
    
    res.status(400).json('Error: '+ error)

  }

})





module.exports = router;
