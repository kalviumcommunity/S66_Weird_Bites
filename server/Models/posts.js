const mongoose=require("mongoose")

const FoodSchema=new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique:true
      },
      image: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
})

const FoodModel=mongoose.model("FoodModel",FoodSchema)
module.exports=FoodModel