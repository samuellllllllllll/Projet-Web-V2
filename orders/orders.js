const express = require("express");
const app = express();
const mongoose = require('mongoose');


app.get("/", (req,res)=>{
    res.send("Orders default route")
})

app.listen(4545, ()=>{
    console.log("Up and running orders");
})
//liste de produits dans mongo

const ordersSchema = new mongoose.Schema({
    menu : String,
    Status : Int8Array,
    validation_code : Int8Array,
    Status : Int8Array,
});
const Orders = mongoose.model('Orders', ordersSchema);

app.get("/", (req, res)=> {
    res.send("Orders default route.")
})



// exports.getKittens = (req, res) =>{
//     mongoose.connect('mongodb://user:mysecretpassword@0.0.0.0:8002/')
//     .then(()=> {
//         console.log('Connected to mongo');
//     });
    
    
//     Cats.find().then((cats) =>{
//         console.log(cats);
//         res.json(cats)
//     });





    
    //res.send(allCats);
    // mongoose
    // .disconnect()
    // .then(()=>{
    //     console.log('Disconnected');
    // });

//};
//mongoose.connect('mongodb://user:mysecretpassword@0.0.0.0:8002/cesi_eats_mongo');

// async function main(){
//     await mongoose.connect('mongodb://user:mysecretpassword@0.0.0.0:8002/')
//     .then(()=> {
//         console.log('Connected to mongo');
//     });

//     const kittySchema = new mongoose.Schema({
//         name :String,
//         activity : String,
//         rarity : String,
//     });

//     const Cats = mongoose.model('Cats', kittySchema);

//     const MrFresh = new Cats(
//         { 
//             name: 'MrFresh', 
//             activity : 'FoodCritic', 
//             rarity : 'Common'
//         }
//     );
//     const TheGluttonousBeast = new Cats(
//         {
//             name : 'TheGluttonousBeast',
//             activity:'Eating',
//             rarity:'Uncommon',
//         }
//     );

//     //const AllKitten = [MrFresh, TheGluttonousBeast]
//     await MrFresh.save();
//     await TheGluttonousBeast.save();

// }

// const test= main();




