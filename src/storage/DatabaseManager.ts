import mongoose from "mongoose";
import { dbHosts, dbName } from "../config/Constants";

export default class DatabaseManager {

    constructor() {

    }

    connect() {
        mongoose.connect(`mongodb://${dbHosts.join(",")}/${dbName}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("I'm connected");
        });
    }
}