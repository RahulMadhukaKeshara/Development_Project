const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const suppliersSchema = new Schema({

    supplier_Name: {type:String , required: true , unique:true},
    supplier_Description: {type:String , required: true},
    supplier_Contact: {type:String , required: true},
    supplier_Email: {type:String , required: true},
    supplier_Address: {type:String , required: true},

},  {
    timestamps: true,
});

const Supplier = mongoose.model('Supplier', suppliersSchema);

module.exports = Supplier;