const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productsSchema = new Schema({

    //product_Img: {type:Buffer},
    product_Name: {type:String , required: true, unique:true},
    product_Category: {type:String , required: true},
    product_Description: {type:String , required: true},
    product_Price: {type:String , required: true},
    product_Discount: {type:String},
    product_Stock : [{
        color: {type:String } ,
        xs_qty : {type:String } , 
        s_qty : {type:String } , 
        m_qty : {type:String } ,  
        l_qty : {type:String } , 
        xl_qty : {type:String } ,  
        xxl_qty : {type:String } 
    }],
    product_Re_Quantity: {type:String},
    product_Re_Level: {type:String},
    product_Published: {type:String , required: true},
    product_Featured: {type:String , required: true},
    product_New: {type:String , required: true},
    

},  {
    timestamps: true,
});

const Product = mongoose.model('Product', productsSchema);

module.exports = Product;