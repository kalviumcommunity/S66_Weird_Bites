const express=require('express')
const app=express()
require('dotenv').config()
const mongoose=require('mongoose')
const UserModel =require("./Models/users")



app.use(express.json())
let connection= mongoose.connect(process.env.mongoURL)


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
    try{
        await connection;
        console.log("Successfully connected to mongoDb")
    }
    catch(error){
        console.log(error)
    }
    console.log(`Server is running on port ${process.env.PORT}`)
})