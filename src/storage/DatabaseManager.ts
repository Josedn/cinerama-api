import mongoose from "mongoose";
import { dbHosts, dbName } from "../config/Constants";

export default class DatabaseManager {
    static connect() {
        return mongoose.connect(`mongodb://${dbHosts.join(",")}/${dbName}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }
}