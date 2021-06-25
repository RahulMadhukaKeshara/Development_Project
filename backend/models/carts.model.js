const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const cartsSchema = new Schema({

    cart_User : {type:Schema.Types.ObjectId , ref: 'User'},
    
    cart_Items: [{
        product : {type:Schema.Types.ObjectId , ref: 'Product'},
        color : {type:String},
        size : {type:String},
        quantity : {type:String},
        unit_Price : {type:String},
    }]

},  {
    timestamps: true,
});

const Cart = mongoose.model('Cart', cartsSchema);

module.exports = Cart;