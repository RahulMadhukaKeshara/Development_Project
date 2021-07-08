const router = require('express').Router();
let User = require('../models/users.model');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
//const env = require('../envVariables')
let Cart = require('../models/carts.model');
require('dotenv').config();

router.route('/').get((req,res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: '+ err));
});


//Owner Adding Users(Admin and Delivery Staff)
router.route('/add').post(async (req,res) => {

    try {
        //Check Current Users
        let user = await User.findOne({ user_Email: req.body.user_Email});
        if(user) return res.status(400).send('Already Registered')
    
        //Create New User
        const user_Type = req.body.user_Type; 
        const user_Status = req.body.user_Status;
        const user_Fname = req.body.user_Fname;
        const user_Lname = req.body.user_Lname;
        const user_Contact = req.body.user_Contact; 
        const user_Email = req.body.user_Email;
        const user_Address_1 = req.body.user_Address_1;
        const user_Address_2 = req.body.user_Address_2; 
        const user_Address_3 = req.body.user_Address_3;  
        const user_District = req.body.user_District; 
        const user_Postal = req.body.user_Postal;
        const user_Password = req.body.user_Password;

        const newUser = new User({

            user_Type, 
            user_Status, 
            user_Fname, 
            user_Lname,
            user_Contact, 
            user_Email, 
            user_Address_1,
            user_Address_2,
            user_Address_3, 
            user_District, 
            user_Postal,
            user_Password 
        });

        const salt = await bcrypt.genSalt(10)
        newUser.user_Password = await bcrypt.hash(newUser.user_Password, salt)
    
        await newUser.save();
        res.status(200).json('User Added!')

    } catch (error) {
        res.status(400).json('Error: '+ error)
    }

});

//Customer Sign Up
router.route('/signup').post(async (req,res) => {

    try {
    //Check Current Users
    let user = await User.findOne({ user_Email: req.body.user_Email});
    if(user) return res.status(400).send('Already Registered')

    //Create New User
    const user_Type = req.body.user_Type; 
    const user_Status = req.body.user_Status;
    const user_Fname = req.body.user_Fname;
    const user_Lname = req.body.user_Lname;
    const user_Contact = req.body.user_Contact; 
    const user_Email = req.body.user_Email;
    const user_Address_1 = req.body.user_Address_1;
    const user_Address_2 = req.body.user_Address_2; 
    const user_Address_3 = req.body.user_Address_3;  
    const user_District = req.body.user_District; 
    const user_Postal = req.body.user_Postal;
    const user_Password = req.body.user_Password;

    const newCustomer = new User({

        user_Type, 
        user_Status, 
        user_Fname, 
        user_Lname,
        user_Contact, 
        user_Email, 
        user_Address_1,
        user_Address_2,
        user_Address_3, 
        user_District, 
        user_Postal,
        user_Password 
    });

    const salt = await bcrypt.genSalt(10)
    newCustomer.user_Password = await bcrypt.hash(newCustomer.user_Password, salt)

    await newCustomer.save();

    //cart implementation
    var newCartOb = new Cart({
        cart_User : newCustomer
    })
    await newCartOb.save();
       res.status(200).json('User Added!')  

    } catch (error) {
       res.status(400).json('Error: '+ error)
    }


});




router.route('/:id').get((req,res) => {
    User.findById(req.params.id)
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: '+ err));
});




router.route('/:id').delete((req,res) => {
    User.findByIdAndDelete(req.params.id)
    .then(() => res.json('User Deleted!'))
    .catch(err => res.status(400).json('Error: '+ err));
});


// Owner updating user details
router.route('/update/:id').post((req,res) => {
    User.findById(req.params.id)
    .then(users => {

        users.user_Type = req.body.user_Type; 
        users.user_Status = req.body.user_Status;

        users.save()
        .then(() => res.json('User Updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: '+ err));
});

//User Login
router.route('/login').post(async (req,res) => {

    //Check Current Users
    let user = await User.findOne({ user_Email: req.body.user_Email});
    if(!user) return res.status(400).send('Invalid email')

    //check password
    const validPassword = await bcrypt.compare(req.body.user_Password, user.user_Password)
    if(!validPassword) res.status(400).send('Invalid Password')

    //Set Token
    const token = jwt.sign({_id : user._id, user_Email: user.user_Email , user_Type:user.user_Type},  process.env.jwtKey)

    //Response
    res.status(200)
    .header('x-auth-token', token)
    .json({
        jwt: token,
        msg: 'Logged In Successfully'
    })

});


// Account User Updating User Account Details 
router.route('/update/user-account/:id').post((req,res) => {
    User.findById(req.params.id)
    .then(users => {

        console.log(req.body)
        users.user_Fname = req.body.user_Fname;
        users.user_Lname = req.body.user_Lname;
        users.user_Contact = req.body.user_Contact; 
        users.user_Address_1 = req.body.user_Address_1;
        users.user_Address_2 = req.body.user_Address_2;
        users.user_Address_3 = req.body.user_Address_3; 
        users.user_District = req.body.user_District; 
        users.user_Postal = req.body.user_Postal;


        users.save()
        .then(() => res.json('Account Details Updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: '+ err));
});


module.exports = router;