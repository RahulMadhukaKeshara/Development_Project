const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productCategoriesSchema = new Schema({

    product_category_Name: {type:String , required: true, unique:true},

},  {
    timestamps: true,
});

const ProductCategory = mongoose.model('ProductCategory', productCategoriesSchema);

module.exports = ProductCategory;