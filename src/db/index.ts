import mongoose from "mongoose";


const connectionToDB = async () => {
    try {
        let connectionInstance;
        if (process.env.NODE_ENV === 'PRODUCTION') {
            console.log('IN PRODUCTION');

            connectionInstance = await mongoose.connect(`${process.env.MONGODB_PRODUCTION_CONNECTION_URL}`);
        } else if (process.env.NODE_ENV === 'STAGING') {
            console.log('IN STAGING');
            connectionInstance = await mongoose.connect(`${process.env.MONGODB_STAGING_CONNECTION_URL}/${process.env.MONGODB_DATABASE_NAME}`);
        } else {
            //LOCAL DEV
            console.log('IN LOCAL DEV');
            connectionInstance = await mongoose.connect(`${process.env.MONGODB_LOCAL_CONNECTION_URL}/${process.env.MONGODB_DATABASE_NAME}`);
        }
        console.log(`MONGODB CONNECTED!! -- DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB CONNECTION FAILED: ", error);
        process.exit(1);

    }
}

export default connectionToDB