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
    origin: 'http://127.0.0.1:5173'
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

app.get("/", (req, res) => {
    res.send("Orders default route")
})

app.listen(4545, () => {
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
    articles: [{
        id_article: Number,
        name_article: String,
        quantity: Number
    }]
});

const Orders = mongoose.model('Orders', ordersSchema);

app.get("/", (req, res) => {
    res.send("Orders default route.")
})

app.post("/orders", (req, res) => {

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
    order.save().then(() => {
        console.log("Succeful order !");
        res.send("Successful order");
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });
})

app.get("/orders", (req, res) => {
    Orders.find().then((orders) => {
        res.json(orders)
    });
})

app.get("/orders/:order_number", (req, res) => {
    Orders.findById(req.params.order_number).then((orders) => {
        if (orders) {
            res.json(orders);
        } else {
            res.sendStatus(404);
        }
    });
});


app.get("/orders/consumers/:user_id", (req, res) => {
    Orders.find({ user_id: req.params.user_id }).then((orders) => {
        if (orders) {
            res.json(orders);
        } else {
            res.sendStatus(404);
        }
    });
})

//Route only used by delivery person and restaurant
app.get("/orders/status/:status", (req, res) => {
    Orders.find({ status: req.params.status }).then((orders) => {
        if (orders) {
            res.json(orders);
        }
        else {
            res.sendStatus(404);
        }
    })
})

//Route used by restaurant & delivery person
app.put("/orders/status/:id/:new_status", (req, res) => {
    //TO DO
    const new_status = req.params.new_status;
    const order_id = req.params.id;
    Orders.findByIdAndUpdate(order_id,
        { $set: { status: new_status } }
    ).then(updateOrder => {
        if (!updateOrder) {
            res.status(400).send("Order not found.");
        }
        else {
            res.status(200).send("Order status updated")
        }
    });

})

//Route used by restaurant & delivery person
app.get("/orders/status2/:id", (req, res) => {
    console.log("hello");
    console.log(req.params.id);
    Orders.findById(req.params.id).then((orders) => {
        if (orders) {
            res.json(orders);
            console.log("item received")
        }
        else {
            res.sendStatus(404);
        }
    })
})


app.get("/orders/restaurants/status/:restaurant_id/:status", (req,res)=>{
    Orders.find({
        restaurant_id: req.params.restaurant_id, 
        status: req.params.status
      }).then((orders) => {
        if (orders) {  
          res.json(orders);
        } else {
          console.log("No orders found");  
          res.status(404).send("No orders found");  
        }
      }).catch(err => {
        console.error('Error retrieving orders:', err);
        res.status(500).send("Server error");  
      });
})

