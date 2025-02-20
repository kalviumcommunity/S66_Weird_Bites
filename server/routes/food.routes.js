const express=require("express")
const foodRouter=express.Router()
const multer=require("multer")
const path=require("path")
const FoodModel=require("../Models/posts")

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

foodRouter.post("/weird-combos", upload.single("image"), async (req, res) => {
    try {
      const { title, description, username } = req.body;
      const image = req.file ? `/uploads/${req.file.filename}` : "";
  
      const newCombo = new FoodModel({ title, image, description, username });
      await newCombo.save();
      
      res.status(201).json(newCombo);
    } catch (error) {
      res.status(500).json({ error: "Could not add combo" });
    }
  });

  foodRouter.post("/upload", upload.single("image"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    res.json({ imageUrl: `/uploads/${req.file.filename}` });
  });
  
  // Serve uploaded images statically
//   foodRouter.use("/uploads", express.static("uploads"));
  

module.exports=foodRouter