const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deliveryChargeSchema = new Schema({

    district : {type : String},
    delivery_charge : {type : String}

},{
    timestamps: true,
});

const DeliveryCharge = mongoose.model('DeliveryCharge' , deliveryChargeSchema);

module.exports = DeliveryCharge;
