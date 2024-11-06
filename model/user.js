import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    todo:[{site:{
        type:String
    },
    username:{
        type:String
    },
    password:{
        type:String
    },
    id:{
        type:String
    }}]

})

export const user = mongoose.models.user|| mongoose.model("user",userSchema)
