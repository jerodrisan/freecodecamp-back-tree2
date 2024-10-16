////
require('dotenv').config();
const { json } = require('body-parser');
const { response } = require('express');
let mongoose=require('mongoose')

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });


//Creamos el modelo de persona
const personSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  age:Number,
  favoriteFoods:[String]
})

let Person = mongoose.model('Person',personSchema)

/* Example */
/*
const someFunc = function(done) {
  //... do something (risky) ...
  if (error) return done(error);
  done(null, result);
};
*/

const createAndSavePerson = (done) => {
  const person = new Person({
    name:'Pepe',
    age:18,
    favoriteFoods:['manza', 'pera', 'fres']
  })  
  //person.save(done) //ver server.js
  person.save((err,data)=>{
    done(err,data)
  })
  //done(null /*, data*/); 
};


const createManyPeople = (arrayOfPeople, done) => {
  //Person.create(arrayOfPeople,done)
   //done(null /*, data*/);
   Person.create(arrayOfPeople, (err,data)=>{
      done(err,data)
   })
};


const findPeopleByName = (personName, done) => {
  //Person.find({name:personName}, done)  
  //done(null /*, data*/);
  Person.find({name:personName}, (err,data)=>{
    done(err,data)
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods:food}, (err,data)=>{
    done(err,data)
  })
 
};

const findPersonById = (personId, done) => {
  Person.findById({_id:personId}, (err,data)=>{
    done(err,data)
  }) 
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({_id:personId}, (err,person)=>{
      //person seria la persona encontrada por el _id:
    //editamos añadiendo
    person.favoriteFoods.push(foodToAdd) 
    person.save((err,data)=>{
      done(err,data)
    })
  } ) 
};


const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name:personName},{age:ageToSet},{ new: true },(err,data)=>{
      done(err,data)
  })   
};


const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err,data)=>{
    done(err,data)
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
   Person.remove({name:nameToRemove}, (err,data)=>{
    done(err,data)
   }) 
  
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods:foodToSearch})
  .sort("name")
  .limit(2)
  .select(["name","favoriteFoods"])
  .exec((err,data)=>{
    done(err,data)
  })
  //done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
