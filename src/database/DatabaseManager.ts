import mongoose from "mongoose";

export default class DatabaseManager {
    static connect(dbHost: string, dbName: string) {
        return mongoose.connect(`mongodb://${dbHost}/${dbName}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }
}