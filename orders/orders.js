const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Enable CORS
app.use(cors({
    origin: 'http://localhost:5173'
}));

// Connect to the database
const uri = process.env.MONGO_DB_URI;
mongoose.connect(uri)
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.log("Error", err);
});

app.get("/", (req,res)=>{
    res.send("Orders default route")
})

app.listen(4545, ()=>{
    console.log("Up and running orders");
})

// Liste de produits dans mongo
const ordersSchema = new mongoose.Schema({
    order_number : Number,
    consumer_id : Number,
    restaurant_id : Number,
    restaurant_name : String,
    delivery_person_id : Number,
    status : Number,
    validation_code : Number,
    price : Number,
    date_and_time : Date,
    menus : [{
        id_menu : Number,
        name_menu : String,
        id_starter : Number,
        name_starter : String,
        id_main_dish : Number,
        name_main_dish : String,
        id_dessert : Number,
        name_dessert : String,
        id_drink : Number,
        name_drink : String,
        quantity : Number
    }],
    articles : [{
        id_article : Number,
        name_article : String,
        quantity : Number
    }]
});

const Orders = mongoose.model('Orders', ordersSchema);

app.get("/", (req, res)=> {
    res.send("Orders default route.")
})

app.post("/orders", (req, res)=>{

    // Get the current date and time
    var current_datetime = new Date();
    var formatted_date = current_datetime.getUTCFullYear() + "-" + (current_datetime.getUTCMonth() + 1) + "-" + current_datetime.getUTCDate() + " " + (current_datetime.getUTCHours() + 2) + ":" + current_datetime.getUTCMinutes() + ":" + current_datetime.getUTCSeconds();

    var newOrder = {
        order_number: Math.floor(1000 + Math.random() * 9000),
        consumer_id: req.body.params.id_consumer,
        restaurant_id: req.body.params.id_restaurant,
        restaurant_name: req.body.params.restaurant_name,
        delivery_person_id: req.body.params.id_delivery_person,
        status: 0,
        validation_code: Math.floor(1000 + Math.random() * 9000),
        price: req.body.params.price,
        date_and_time: formatted_date,
        menus: req.body.params.menus,
        articles: req.body.params.articles
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
    Orders.find({consumer_id : req.query.consumer_id}).then((orders)=>{
        if (orders){
            res.json(orders);
        }else{
            res.sendStatus(404);
        }
    });
})

// Route only used by delivery person
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

// Route used by restaurant & delivery person
app.put("/orders/status/:status", (req,res)=>{
    //TO DO

})