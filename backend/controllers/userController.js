import userModel from "../models/userModel";
import  jwt from "jsonwebtoken"
import bycrypt from "bycrypt"
import validator from "validator"

// login user
const loginUser = async(req,res) =>{

}

const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

// registerr user
const registerUser = async (req,res) =>{
    const {name,password,email}=req.body;
    try{
        //checking is user already exist
        const exist= await userModel.findOne({email})
        if(exist){
            return res.json({success: false, message:"user already exist"})
        }

        // validating email formate and strong pass
        if(!validator.isEmail(email)){
            return res.json({success: false, message:"plese enter a valid email"})
        }

        if(password.length < 8){
            return res.json({success: false, message:"please enter a strong password"})
        }

        // hashing or encrypting user password
        const salt= await bycrypt.gensalt(10)
        const hashedPassowed= await bycrypt.hash(password,salt);

        const newUser= new userModel({
            name: name,
            email: email,
            password: hashedPassword
        })

        const user= await newUser.save()
        const token=createToken(user._id)
        res.json({success: true, token})

    }catch(error){
        console.log(error);
        res.json({success: false, message:"Error"})
    }
}

export {loginUser, registerUser}