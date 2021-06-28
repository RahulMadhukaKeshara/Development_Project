const router = require('express').Router();
let DeliveryCharge = require('../models/deliveryCharges.model');


//Get all delivery charge details
router.route('/').get((req,res) => {
    DeliveryCharge.find()
    .then(deliveryCharge => res.json(deliveryCharge))
    .catch(err => res.status(400).json('Error: '+ err));
});

//Add new delivery charge 
router.route('/add').post(async(req,res) => {

    //Check Current District
    let District = await DeliveryCharge.findOne({ district: req.body.district});
    if(District) return res.status(400).send('Already Added')

    const district = req.body.district;
    const delivery_charge = req.body.delivery_charge;

    const newDeliveryCharge = new DeliveryCharge({

        district,
        delivery_charge,

    });

    newDeliveryCharge.save()
    .then(() => res.json('Delivery Charge Added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//get specific delivery charge
router.route('/:id').get((req,res) => {
    DeliveryCharge.findById(req.params.id)
    .then(deliveryCharge => res.json(deliveryCharge))
    .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/charges').post(async(req,res) => {
    try {
        let District = await DeliveryCharge.findOne({ district: req.body.district});
        res.json(District)

    } catch (error) {
        res.status(400).json('Error: '+ error)
    }
});

//delete delivery charge
router.route('/:id').delete((req,res) => {
    DeliveryCharge.findByIdAndDelete(req.params.id)
    .then(() => res.json('Delivery Charge Deleted!'))
    .catch(err => res.status(400).json('Error: '+ err));
});

//update delivery charge 
router.route('/update/:id').post((req,res) => {
    DeliveryCharge.findById(req.params.id)
    .then(charge => {

        //console.log(req.body)
        charge.delivery_charge = req.body.delivery_charge;

        charge.save()
        .then(() => res.json('Delivery Charge Updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: '+ err));
});


module.exports = router;