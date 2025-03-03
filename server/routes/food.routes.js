const express=require("express")
const foodRouter=express.Router()
const multer=require("multer")
const path=require("path")
const FoodModel=require("../Models/posts")
const { error } = require("console")

const storage=multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, "uploads/")
    },
    filename:(req,file,cb)=>{
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload=multer({storage})

foodRouter.get("/weird-combos",async(req,res) =>{
    try {
        const combos=await FoodModel.find()
        res.json(combos)
    } catch (error) {
        res.status(500).json({error:"Server error"})
    }
})

foodRouter.get("/weird-combos/:id", async (req, res) => {
  try {
      const { id } = req.params;
      const combo = await FoodModel.findById(id);
      
      if (!combo) {
          return res.status(404).json({ error: "Combo not found" });
      }

      res.json(combo);
  } catch (error) {
      console.error("Error fetching combo:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});


foodRouter.post("/weird-combos", upload.single("image"), async (req, res) => {
    try {
      const { title, description, username } = req.body;
      const image = req.file ? `/uploads/${req.file.filename}` : "";
  
      const newCombo = new FoodModel({ title, image, description, username });
      await newCombo.save();
      
      res.status(201).json(newCombo);
    } catch (error) {
      res.status(500).json({ error: "Could not add combo",error });
    }
  });

  foodRouter.put("/weird-combos/:id",upload.single("image"),async(req,res)=>{
    const id=req.params.id
    const { title, description, username } = req.body;
    const image=req.file ? `/uploads/${req.file.filename}`:req.body.image
    try {
      const updatedCombo=await FoodModel.findByIdAndUpdate(id, {title, description, username,image:image })

    if(!updatedCombo){
      return res.status(404).json({error:"Combo not found"})
    }
    res.status(200).send({ "message": "Successfully updated the product", data: updatedCombo })
    } catch (error) {
        res.status(500).json({ error: "Could not update combo" });
    }
  })

  foodRouter.delete("/weird-combos/:id",async(req,res)=>{
    const id=req.params.id
    try {
      const deletedProduct=await FoodModel.findByIdAndDelete(id)
      if(!deletedProduct){
        return res.status(404).json({ "message": "Product not found" })
      }
      res.status(200).json({ "message": "Successfully deleted the product", data: deletedProduct })
    } catch (error) {
      console.error(error); 
      res.status(500).json({ "error": "Failed to delete product" });
    }
  })

  foodRouter.post("/upload", upload.single("image"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    res.json({ imageUrl: `/uploads/${req.file.filename}` });
  });
  
  // Serve uploaded images statically
//   foodRouter.use("/uploads", express.static("uploads"));
  

module.exports=foodRouter