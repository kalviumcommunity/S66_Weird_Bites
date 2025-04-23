const express=require('express')
const mysql=require("mysql2")
require('dotenv').config()
const mongoose=require('mongoose')
const cors=require("cors")
const router=require("./routes/router")
const foodRouter=require("./routes/food.routes")
const path = require('path');

let dbConnection="Disconnected" 

const app=express()
app.use(express.json());
app.use(cors())


let connection= mongoose.connect(process.env.mongoURL).then((res)=>{
    console.log("Connected to MongoDB!")
    dbConnection="Connected";

}).catch((err)=>{
    console.log(err)
     dbConnection="Connection Failed!";
})

const sqlConnection=mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})

sqlConnection.connect((err)=>{
    if(err){
        console.error("Error connecting to mysql",err)
    }else{
        console.log("connected to mySQL database")
    }
})

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/",(req,res)=> {
    try {
        res.send({"Message":"Connected to database successully!","Connection Status":dbConnection});
    } catch (error) {
        res.send(error)
    }
})

app.use("/api",router)
app.use("/food",foodRouter)


app.listen(process.env.PORT,async()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})



