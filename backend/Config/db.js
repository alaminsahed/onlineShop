import mongoose from "mongoose";


const connectionDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        })

        console.log(`MongoDB connected ${conn.connection.host}`);

    } catch (error){
        console.log(`Error: ${error.message}`)
        process.exit(1)
    }
}

export default connectionDB;