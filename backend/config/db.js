import mongoose from "mongoose";

export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://pushpendra:pushpendra2004@cluster01.8xbrnta.mongodb.net/food').then(()=>console.log('DB connected'))
}