const router = require('express').Router();
let Supplier = require('../models/suppliers.model');
const nodemailer = require("nodemailer");

//get all suppliers
router.route('/').get((req,res) => {
    Supplier.find()
    .then(suppliers => res.json(suppliers))
    .catch(err => res.status(400).json('Error: '+ err));
});


// add new suppliers
router.route('/add').post((req,res) => {

    const supplier_Name = req.body.supplier_Name;
    const supplier_Description = req.body.supplier_Description;
    const supplier_Contact = req.body.supplier_Contact;
    const supplier_Email = req.body.supplier_Email;
    const supplier_Address = req.body.supplier_Address;

    const newSupplier = new Supplier({

        supplier_Name,
        supplier_Description,
        supplier_Contact,
        supplier_Email,
        supplier_Address,
    });

    newSupplier.save()
    .then(() => res.json('Supplier Added!'))
    .catch(err => res.status(400).json('Error: ' + err));

});

//add suppliers by id 
router.route('/:id').get((req,res) => {
    Supplier.findById(req.params.id)
    .then(suppliers => res.json(suppliers))
    .catch(err => res.status(400).json('Error: '+ err));
});


//delete suppliers
router.route('/:id').delete((req,res) => {
    Supplier.findByIdAndDelete(req.params.id)
    .then(() => res.json('Supplier Deleted!'))
    .catch(err => res.status(400).json('Error: '+ err));
});


//update supplier details
router.route('/update/:id').post((req,res) => {
    Supplier.findById(req.params.id)
    .then(suppliers => {

        suppliers.supplier_Name = req.body.supplier_Name;
        suppliers.supplier_Description = req.body.supplier_Description;
        suppliers.supplier_Contact = req.body.supplier_Contact;
        suppliers.supplier_Email = req.body.supplier_Email;
        suppliers.supplier_Address = req.body.supplier_Address;


        suppliers.save()
        .then(() => res.json('Supplier Updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: '+ err));
});



module.exports = router;