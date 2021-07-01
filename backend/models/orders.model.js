const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ordersSchema = new Schema({

    order_User : {type:Schema.Types.ObjectId , ref: 'User'},
    
    order_Items: [{
        product : {type:Schema.Types.ObjectId , ref: 'Product'},
        color : {type:String},
        size : {type:String},
        quantity : {type:String},
        unit_Price : {type:String},
    }],

    payment_Method : {type:String},
    order_Status: {type:String},
    order_Total : {type:String},
    order_Placed_Date :{type:String},

    expected_Delivery_Date : {type:String},
    actual_Delivery_Date : {type:String},

    delivery_Fname : {type:String},
    delivery_Lname: {type:String},
    delivery_Contact: {type:String},
    delivery_Address_1: {type:String},
    delivery_Address_2: {type:String},
    delivery_Address_3: {type:String},
    delivery_District: {type:String},
    delivery_Postal: {type:String},
    delivery_Instructions: {type:String},
    delivery_Member: {type:String},

},  {
    timestamps: true,
});

const Cart = mongoose.model('Order', ordersSchema);

module.exports = Cart;