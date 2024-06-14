const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
app.use(bodyParser.json());

mongoose.connect('mongodb://user:mysecretpassword@0.0.0.0:8002/', {
    dbName : 'cesi_eats_mongo'
})
.then(()=>{
    console.log("Connected to mongo")
})

app.get("/", (req,res)=>{
    res.send("Orders default route")
})

app.listen(4545, ()=>{
    console.log("Up and running orders");
})
//liste de produits dans mongo

const ordersSchema = new mongoose.Schema({
    menu : String,
    Status : Number,
    validation_code : Number,
    restaurant_id : Number,
    user_id : Number,
});
const Orders = mongoose.model('Orders', ordersSchema);

app.get("/", (req, res)=> {
    res.send("Orders default route.")
})

app.post("/orders", (req, res)=>{
    console.log(req.body);

    var newOrder = {
        menu : req.body.menu,
        Status : req.body.Status,
        validation_code :req.body.validation_code,
        restaurant_id : req.body.restaurant_id,
        user_id : req.body.user_id
    }

    const order = new Orders(newOrder);
    order.save().then(()=>{
        console.log("Succeful order !");
        res.send("Successful order");
    }).catch((err)=>{
        if (err){
            throw err;
        }
    });

})

app.get("/orders", (req, res)=>{

})

app.put("/orders", (req,res)=>{

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




