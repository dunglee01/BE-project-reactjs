import express from "express";
import User from "../models/User.js";
import jwt from 'jsonwebtoken'

const router = express.Router();

const handleValidateReq = ({ username, password }, res) => {
    if(!username || !password) {
        return res.status(400).json({message: "All fields are required"});
    }
}


router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    handleValidateReq({ username, password }, res)

   let user = await User.findOne({username})

   if(user) {
    return res.status(400).json({message: "User already exists"})
   }

   user = new User({username, password});
   await user.save();

   res.status(201).json({message: "User created successfully"})

})

router.post("/login", async (req, res) => {
   try {
    const { username, password } = req.body;

    handleValidateReq({ username, password }, res)

    const user = await User.findOne({username})

    if(!user) {
        return res.status(400).json({message: "User does not exist"})
    }

    const isMatch = await user.comparePassword(password)
    
    if(!isMatch) {
        return res.status(400).json({message: "Invalid credentials"})
    }

    const token = jwt.sign({id: user._id}, "dunglv", {expiresIn: "1d"})

    res.json({token, username, id: user._id})
   } catch (error) {
    res.status(500).json({message: error.message})
   }

})
    


export default router