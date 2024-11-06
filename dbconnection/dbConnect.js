import mongoose from "mongoose"
const dbconnect = async () => {
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("db is connected")
    }).catch((error)=>{
        console.log("db is not connected",error)
    })
}

export default dbconnect