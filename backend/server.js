const express =  require('express');
const cors = require('cors');
const mongoose = require('mongoose');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({limit: '50mb', extended: true}));



const uri = process.env.LOCAL_URI;
mongoose.connect(uri,{useNewUrlParser: true , useCreateIndex: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open' , () => {
    console.log("MongoDB database connection established succesfully");
})

const productCategoryRouter = require('./routes/productCategories');
const supplierRouter = require('./routes/suppliers');
const productRouter = require('./routes/products');
const userRouter = require('./routes/users');
const cartRouter = require('./routes/cart');
const deliveryChargeRouter = require('./routes/deliveryCharge');
const orderRouter = require('./routes/orders');


app.use('/productCategories', productCategoryRouter);
app.use('/suppliers', supplierRouter);
app.use('/products', productRouter);
app.use('/users' , userRouter);
app.use('/cart' , cartRouter);
app.use('/deliveryCharges' , deliveryChargeRouter);
app.use('/orders' , orderRouter);



app.listen(port, () => {
    console.log(`server is running on port : ${port}`);
});

