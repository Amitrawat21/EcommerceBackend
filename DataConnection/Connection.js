import mongoose from "mongoose";

import dotenv from 'dotenv';

dotenv.config();
const DB = process.env.MONGO_URL

mongoose.connect(DB , {
    useUnifiedTopology :true,
    useNewUrlParser : true
    
}).then(()=>{
    console.log("database Connected")
}).catch((error)=>{
    console.log("database is not connected ")
})