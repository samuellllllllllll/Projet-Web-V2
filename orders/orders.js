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
        quantity_menu : Number
    }],
    status : Number,
    validation_code : Number,
    restaurant_id : Number,
    user_id : Number,
    price : Number,
    courier_id : Number,
    articles : [{
        article : String,
        quantity_article : Number
    }] 
});


const Orders = mongoose.model('Orders', ordersSchema);

app.get("/", (req, res)=> {
    res.send("Orders default route.")
})

app.post("/orders", (req, res)=>{
    //ajouter livreur id
    console.log(req.query);

    const menus= [];
    const articles = [];
    let index_menus = 0;
    let index_articles = 0;
    while (req.query[`main${index_menus}`] || req.query[`article${index_articles}`]){
        if (req.query[`main${index_menus}`]){
            menus.push({
                main: req.query[`main${index_menus}`],
                beverage: req.query[`beverage${index_menus}`],
                dessert: req.query[`dessert${index_menus}`],
                quantity_menu : req.query[`quantity_menu${index_menus}`]
            });
            index_menus++;
        }
        if (req.query[`article${index_articles}`]){
            articles.push({
                article: req.query[`article${index_articles}`],
                quantity_article: req.query[`quantity_article${index_articles}`]
            });
            index_articles++;
        } 
    }
    var newOrder = {
        menus: menus,
        status : req.query.status,
        validation_code :req.query.validation_code,
        restaurant_id : req.query.restaurant_id,
        user_id : req.query.user_id,
        price: req.query.price,
        courier_id : req.query.courier_id,
        articles: articles
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