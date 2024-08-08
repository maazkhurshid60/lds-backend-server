import mongoose from "mongoose";


const connectionToDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_CONNECTION_LOCAL_URL}/${process.env.MONGODB_DATABASE_NAME}`);
        console.log(`MONGODB CONNECTED!! -- DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB CONNECTION FAILED: ", error);
        process.exit(1);
        
    }
}

export default connectionToDB