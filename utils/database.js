import mongoose from "mongoose";

let isConnected = false

export const connectToDB = async () => {

    console.log("sono in connectToDB------------------------");

    mongoose.set('strictQuery' , true)

    if (isConnected) {
        console.log("MongoDb is already connected !");
        return;
    }

    try {
        console.log("MongoDb , try connection .........");
        await mongoose.connect(process.env.MONGODB_URI , {
            dbName: "PromptopiaDB",
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        isConnected = true

        console.log("MongoDB is connected");
    } catch (error) {
        console.log(error);
    }
}