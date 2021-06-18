const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productsSchema = new Schema({

    //product_Img: {type:Buffer},
    product_Name: {type:String , required: true, unique:true},
    product_Category: {type:String , required: true},
    product_Description: {type:String , required: true},
    product_Price: {type:Number , required: true},
    product_Discount: {type:Number},
    product_Stock : [{
        color: {type:String , required: true} ,
        xs_qty : {type:Number , required: true} , 
        s_qty : {type:Number , required: true} , 
        m_qty : {type:Number , required: true} ,  
        l_qty : {type:Number , required: true} , 
        xl_qty : {type:Number , required: true} ,  
        xxl_qty : {type:Number , required: true} 
    }],
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