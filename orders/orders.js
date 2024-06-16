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
    menus : [{
        main : String,
        beverage : String,
        dessert : String,
        quantity :Number
    }],
    status : Number,
    validation_code : Number,
    restaurant_id : Number,
    user_id : Number,
    price : Number,
    article : Array,
    
});


const Orders = mongoose.model('Orders', ordersSchema);

app.get("/", (req, res)=> {
    res.send("Orders default route.")
})

app.post("/orders", (req, res)=>{
    //ajouter price
    //ajouter quantity
    //menu
    console.log(req.query);

    const menus= [];
    let index = 0;
    while (req.query[`main${index}`]){
        menus.push({
            main: req.query[`main${index}`],
            beverage: req.query[`beverage${index}`],
            dessert: req.query[`dessert${index}`],
            quantity : req.query[`quantity${index}`]
        });
        index++;
    }
    var newOrder = {
        menus: menus,
        // menu : {
        //     plat : req.query.plat,
        //     boisson : req.query.boisson,
        //     dessert: req.query.dessert
        // },
        status : req.query.status,
        validation_code :req.query.validation_code,
        restaurant_id : req.query.restaurant_id,
        user_id : req.query.user_id,
        price: req.query.price,
        article: req.query.article
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
    Orders.find().then((orders)=>{
        res.json(orders)
    });
})

app.get("/orders/:id", (req,res)=>{
    Orders.find({user_id : req.params.id}).then((orders)=>{
        if (orders){
            res.json(orders);
        }else{
            res.sendStatus(404);
        }
    });
})

//Route only used by delivery person
app.get("/orders/status/:status", (req,res)=>{
    Orders.find({status : req.params.status}).then((orders)=>{
        if (orders){
            res.json(orders);
        }
        else{
            res.sendStatus(404);
        }
    })
})


//Route used by restaurant & delivery person
app.put("/orders/status/:status", (req,res)=>{
    //TO DO

})