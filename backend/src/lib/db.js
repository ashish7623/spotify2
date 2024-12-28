import mongoose from "mongoose"

export const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URL)
        console.log(`Connected to MongoDB ${conn.connection.host}`)


    }catch(error){
        console.log("Failed to connect to MongoDB ",error)
        process.exit(1) // 0 is success message and 1 is failure
     }
}