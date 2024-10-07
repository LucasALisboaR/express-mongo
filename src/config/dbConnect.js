import mongoose from "mongoose";

async function ConectaNaDataBase() {
    mongoose.connect(process.env.DB_CONNECTION_STRING)
    return mongoose.connection;
}

export default ConectaNaDataBase
