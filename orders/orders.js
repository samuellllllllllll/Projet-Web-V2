const express = require("express");
const app = express();

app.get("/", (req,res)=>{
    res.send("Orders default route")
})

app.listen(4545, ()=>{
    console.log("Up and running orders");
})
//liste de produits dans mongo