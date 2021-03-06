const router = require('express').Router();
let ProductCategory = require('../models/productCategories.model');


//get all product categories
router.route('/').get((req,res) => {
    ProductCategory.find()
    .then(productCategories => res.json(productCategories))
    .catch(err => res.status(400).json('Error: '+ err));
});

//add new product category
router.route('/add').post((req,res) => {

    const product_category_Name = req.body.product_category_Name;


    const newProductCategory = new ProductCategory({

        product_category_Name,

    });

    newProductCategory.save()
    .then(() => res.json('ProductCategory Added!'))
    .catch(err => res.status(400).json('Error: ' + err));

});

//get product category by id
router.route('/:id').get((req,res) => {
    ProductCategory.findById(req.params.id)
    .then(productCategories => res.json(productCategories))
    .catch(err => res.status(400).json('Error: '+ err));
});


//delete product category
router.route('/:id').delete((req,res) => {
    ProductCategory.findByIdAndDelete(req.params.id)
    .then(() => res.json('ProductCategory Deleted!'))
    .catch(err => res.status(400).json('Error: '+ err));
});


//update product category
router.route('/update/:id').post((req,res) => {
    ProductCategory.findById(req.params.id)
    .then(productCategories => {

        productCategories.product_category_Name = req.body.product_category_Name;


        productCategories.save()
        .then(() => res.json('ProductCategory Updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: '+ err));
});


module.exports = router;