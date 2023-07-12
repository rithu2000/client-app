import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

async function connect() {
    const mongod = await MongoMemoryServer.create();
    const getUri = mongod.getUri();
    const connection = "mongodb://localhost:27017/client-app"

    const db = await mongoose.connect(connection, {

    useNewUrlParser: "true",
    useUnifiedTopology: "true"
  
  })
    console.log('Database Connected');

    return db;
}

export default connect;