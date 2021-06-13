const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productsSchema = new Schema({

    product_Img: {type:String },
    product_Name: {type:String , required: true, unique:true},
    product_Category: {type:String , required: true},
    product_Quantity: {type:Number , required: true},
    product_Description: {type:String , required: true},
    product_Sizes: {type:String},
    product_Colors: {type:String},
    product_Price: {type:Number , required: true},
    product_Discount: {type:Number},
    product_Re_Quantity: {type:Number},
    product_Re_Level: {type:Number},
    product_Published: {type:String , required: true},
    product_Featured: {type:String , required: true},
    product_New: {type:String , required: true},
    

},  {
    timestamps: true,
});

const Product = mongoose.model('Product', productsSchema);

module.exports = Product;