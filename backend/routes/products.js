const router = require('express').Router();
const multer = require("multer");
let Product = require('../models/products.model');
let User = require('../models/users.model');
let Supplier = require('../models/suppliers.model');
let Order = require('../models/orders.model');
const invoice = require('../middlewares/invoice');

//multer configuration
const upload = multer({
    limits: {
      fileSize: 1000000, // max file size 1MB = 1000000 bytes
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(jpeg|jpg)$/)) {
        cb(new Error("only upload files with jpg or jpeg format."));
      }
      cb(undefined, true); // continue with upload
    },

  });


// get all products
router.route('/').get(async(req,res) => {
    Product.find().populate([{path : 'product_reviews.review_person' , model : 'User'},{path : 'product_Supplier' , model : 'Supplier'}])
    .then(products => res.json(products))
    .catch(err => res.status(400).json('Error: '+ err));
});


// add a new product
router.route('/add').post(upload.single("product_Img"),async(req,res) => {
    
  let supplierOb = await Supplier.findById(req.body.product_Supplier);

    const product_Name = req.body.product_Name;
    const product_Category = req.body.product_Category;
    const product_Description = req.body.product_Description;
    const product_Price = parseFloat(req.body.product_Price);
    const product_Discount = req.body.product_Discount;
    const product_Stock = JSON.parse(req.body.product_Stock);
    const product_Re_Quantity = req.body.product_Re_Quantity;
    const product_Re_Level = req.body.product_Re_Level;
    const product_Published = req.body.product_Published;
    const product_Featured = req.body.product_Featured;
    const product_New = req.body.product_New;
    const product_Supplier = supplierOb;


    const newProduct = new Product({

        product_Name,
        product_Category,
        product_Description,
        product_Price,
        product_Discount,
        product_Stock,
        product_Re_Quantity,
        product_Re_Level,
        product_Published,
        product_Featured,
        product_New,
        product_Supplier,

    });

    const file = req.file.buffer;
    newProduct.product_Img = file;

    newProduct.save()
    .then(() => res.json('Product Added!'))
    .catch(err => res.status(400).json('Error: ' + err));

});


//get product image 
router.get("/photo/:id", async (req, res) => {
  try {
    const result = await Product.findOne({ _id: req.params.id });
    res.set("Content-Type", "image/jpeg");
    res.send(result.product_Img);
  } catch (error) {
    res.status(400).send({ get_error: "Error while getting photo." });
  }
});


//get product by id
router.route('/:id').get((req,res) => {
    Product.findById(req.params.id).populate([{path : 'product_reviews.review_person' , model : 'User'},{path : 'product_Supplier' , model : 'Supplier'}])
    .then(products => res.json(products))
    .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/:id').delete((req,res) => {
    Product.findByIdAndDelete(req.params.id)
    .then(() => res.json('Product Deleted!'))
    .catch(err => res.status(400).json('Error: '+ err));
});

//update product details
router.route('/update/:id').post(upload.single("product_Img"),async(req,res) => {

    let supplierOb = await Supplier.findById(req.body.product_Supplier);
    Product.findById(req.params.id)
    .then(products => {

        products.product_Img = req.file.buffer;
        products.product_Name = req.body.product_Name;
        products.product_Category = req.body.product_Category;
        products.product_Description = req.body.product_Description;
        products.product_Price = parseFloat(req.body.product_Price);
        products.product_Discount = req.body.product_Discount;
        products.product_Stock = JSON.parse(req.body.product_Stock);
        products.product_Re_Quantity = req.body.product_Re_Quantity;
        products.product_Re_Level = req.body.product_Re_Level;
        products.product_Published = req.body.product_Published;
        products.product_Featured = req.body.product_Featured;
        products.product_New = req.body.product_New;
        products.product_Supplier = supplierOb;

        products.save()
        .then(() => res.json('Product Updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: '+ err));
});


//add reviews
router.route('/addReview/:id').post(async(req,res)=>{

  try {
     let productOb =  await Product.findOne({ _id: req.params.id });
     let reviewUserOb = await User.findOne({ _id: req.body.review_person });
     let orderOb = await Order.findOne({_id:req.body.review_order});

     productOb.product_reviews.push({
      review_person : reviewUserOb,
      review_date : req.body.review_date,
      review_text : req.body.review_text,
      review_order : orderOb,
      review_rating : req.body.review_rating
     })
    
     productOb.save();
     res.json('Review Added!');

  } catch (error) {
    res.status(400).json('Error: ' + error)
  }

})


module.exports = router;