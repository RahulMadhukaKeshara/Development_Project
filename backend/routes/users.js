const router = require('express').Router();
let User = require('../models/users.model');

router.route('/').get((req,res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/add').post((req,res) => {

    const user_Type = req.body.user_Type; 
    const user_Status = req.body.user_Status;
    const user_Fname = req.body.user_Fname;
    const user_Lname = req.body.user_Lname;
    const user_Contact = req.body.user_Contact; 
    const user_Email = req.body.user_Email;
    const user_Address = req.body.user_Address; 
    const user_City = req.body.user_City; 
    const user_Postal = req.body.user_Postal;
    const user_Password = req.body.user_Password;

    const newUser = new User({

        user_Type, 
        user_Status, 
        user_Fname, 
        user_Lname,
        user_Contact, 
        user_Email, 
        user_Address, 
        user_City, 
        user_Postal,
        user_Password 
    });

    newUser.save()
    .then(() => res.json('User Added!'))
    .catch(err => res.status(400).json('Error: ' + err));

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

router.route('/update/:id').post((req,res) => {
    User.findById(req.params.id)
    .then(users => {

        users.user_Type = req.body.user_Type; 
        users.user_Status = req.body.user_Status;
        users.user_Fname = req.body.user_Fname;
        users.user_Lname = req.body.user_Lname;
        users.user_Contact = req.body.user_Contact; 
        users.user_Email = req.body.user_Email;
        users.user_Address = req.body.user_Address; 
        users.user_City = req.body.user_City; 
        users.user_Postal = req.body.user_Postal;
        users.user_Password = req.body.user_Postal;


        users.save()
        .then(() => res.json('User Updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: '+ err));
});

module.exports = router;