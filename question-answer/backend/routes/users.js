const router= require('express').Router();
let User= require('../models/user.model')

router.route('/').get((req,res)=>{ // '/' will work if its 'http://localhost5000/users/'
    User.find() // it is going to give all the users in the mongodb database

    .then(users =>res.json(users))// it returns the users in the json format(res.json means to return something in json format)
    .catch(err => res.status(400).json('Error: '+err)); // if there is an error then it will catch in catch block
});

router.route('/add').post((req,res)=>{
    const username= req.body.username; // to create a username
    const newUser = new User({username}); // new username will be added to database

    newUser.save()
    .then(()=>res.json('User added!'))//after adding the username to the database it will display the user addded
    .catch(err=>res.status(400).json("Error:"+err))// otherwise it will catch the error in the catch block

})

module.exports= router;