const router = require('express').Router();
let exercise = require('../models/exercise.model');
const Exercise = require('../models/exercise.model');

//getting the id(information of a particular memeber)
router.route('/').get((req,res)=>{
    Exercise.find()

    .then(exercises => res.json(exercises))
    .catch(err=>res.status(400).json("Error:"+err));
})
// first adding the name and all other things and adding it to the datbase
router.route('/add').post((req,res)=>{
    const username = req.body.username;
    const description= req.body.description;
    const duration = Number(req.body.duration);
    const date= Date.parse(req.body.date);


    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    })
// saving it to the database
    newExercise.save()
    .then(()=>res.json("Exercise added!"))
    .catch(err => res.status(400).json('Error' +err));
});

router.route('/:id').get((req,res)=>{ // the id here is the object id(its the get request)
    Exercise.findById(req.params.id) // getting the id by keyword findByid
    .then(exercise=>res.json(exercise)) //if we get the id convert the info into json
    .catch(err=>res.status(400).json('Error:'+err)); // if not throw the error
})

router.route('/:id').delete((req,res)=>{// its the delete request(hence the same just the keywords are different)
    Exercise.findByIdAndDelete(req.params.id)// find by id and delete 
    .then(()=>res.json("Exercise deleted")) // after deleted display the msg
    .catch(err=> res.status(400).json('Error:'+err)); // if not throw the error
})

router.route('/update/:id').post((req,res)=>{ // now first we have to find the id we want to update
    Exercise.findById(req.params.id)// find the id by findbyId
    .then(exercise=>{ // <-- exercise that we got from the database & getting the information using database
        exercise.username= req.body.username;//updating all the values |||
        exercise.description= req.body.description;
        exercise.duration= Number(req.body.duration);
        exercise.date= Date.parse(req.body.date);

        exercise.save() //saving the updated information
        .then(()=>res.json('Exercise updated')) //displaying the msg after updated
        .catch(err=>res.status(400).json('Error'+err))// otherwise throw an error

    })
    .catch(err=>res.status(400).json('Error:'+err));
})

module.exports= router;