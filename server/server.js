const express=require('express')
const app=express()
require('dotenv').config()
const mongoose=require('mongoose')
const UserModel =require("./Models/users")

let dbConnection="Disconnected"

app.use(express.json());

let connection= mongoose.connect(process.env.mongoURL).then((res)=>{
    console.log("Connected to MongoDB!")
    dbConnection="Connected";

}).catch((err)=>{
    console.log(err)
     dbConnection="Connection Failed!";
})

app.get("/",(req,res)=> {
    try {
        res.send({"Message":"Connected to database successully!","Connection Status":dbConnection});
    } catch (error) {
        res.send(error)
    }
})


app.get('/ping',(req,res) =>{
    res.send('pong')
})

app.post("/create",async(req,res)=> {
    const{username,password,email}=req.body
    payload={username,password,email}

    try {
        let newUser=UserModel(payload)
        await newUser.save()
        res.send({"mesaage":"Hurray! Saved Successfully.."})
    } catch (error) {
        console.log(error)
        res.send({error:"error"})
    }
})


app.listen(process.env.PORT,async()=>{
    // try{
    //     // await connection;
    //     dbConnection="Connected"
    //     console.log("Successfully connected to mongoDb")
    // }
    // catch(error){
    //     console.log(error)
    //     dbConnection=`Error: ${error.mesaage}`
    // }
    console.log(`Server is running on port ${process.env.PORT}`)
})