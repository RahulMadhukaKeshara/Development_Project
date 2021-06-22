const router = require('express').Router();
const multer = require("multer");
let Product = require('../models/products.model');


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


router.route('/').get((req,res) => {
    Product.find()
    .then(products => res.json(products))
    .catch(err => res.status(400).json('Error: '+ err));
});


router.route('/add').post(upload.single("product_Img"),(req,res) => {
    

  //  const product_Img = req.body.product_Img;
    const product_Name = req.body.product_Name;
    const product_Category = req.body.product_Category;
    const product_Description = req.body.product_Description;
    const product_Price = req.body.product_Price;
    const product_Discount = req.body.product_Discount;
    const product_Stock = JSON.parse(req.body.product_Stock);
    const product_Re_Quantity = req.body.product_Re_Quantity;
    const product_Re_Level = req.body.product_Re_Level;
    const product_Published = req.body.product_Published;
    const product_Featured = req.body.product_Featured;
    const product_New = req.body.product_New;


    const newProduct = new Product({

      //  product_Img,
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

    });

    const file = req.file.buffer;
    newProduct.product_Img = file;

    newProduct.save()
    .then(() => res.json('Product Added!'))
    .catch(err => res.status(400).json('Error: ' + err));

});

router.get("/photo/:id", async (req, res) => {
  try {
    const result = await Product.findOne({ _id: req.params.id });
    res.set("Content-Type", "image/jpeg");
    res.send(result.product_Img);
  } catch (error) {
    res.status(400).send({ get_error: "Error while getting photo." });
  }
});

router.route('/:id').get((req,res) => {
    Product.findById(req.params.id)
    .then(products => res.json(products))
    .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/:id').delete((req,res) => {
    Product.findByIdAndDelete(req.params.id)
    .then(() => res.json('Product Deleted!'))
    .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/update/:id').post(upload.single("product_Img"),(req,res) => {
    Product.findById(req.params.id)
    .then(products => {

        //products.product_Img = req.body.product_Img;
        products.product_Name = req.body.product_Name;
        products.product_Category = req.body.product_Category;
        products.product_Description = req.body.product_Description;
        products.product_Price = req.body.product_Price;
        products.product_Discount = req.body.product_Discount;
        products.product_Stock = JSON.parse(req.body.product_Stock);
        products.product_Re_Quantity = req.body.product_Re_Quantity;
        products.product_Re_Level = req.body.product_Re_Level;
        products.product_Published = req.body.product_Published;
        products.product_Featured = req.body.product_Featured;
        products.product_New = req.body.product_New;

        const file = req.file.buffer;
        products.product_Img = file;

        products.save()
        .then(() => res.json('Product Updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: '+ err));
});


module.exports = router;