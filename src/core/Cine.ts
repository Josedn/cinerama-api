//import Logger, { LogLevel } from "../misc/Logger";
import CineEnvironment from "../CineEnvironment";
import { ConfigKeys } from "../misc/Constants";
import DatabaseManager from "../database/DatabaseManager";
import Api from "./Api";
import RouteManager from "./controllers/RouteManager";

//const writeLine = Logger.generateLogger("Core");

export default class Cine {
    private api: Api;
    private databaseManager: DatabaseManager;
    private routeManager: RouteManager;

    constructor() {
        this.api = new Api();
        this.databaseManager = new DatabaseManager();
        this.routeManager = new RouteManager();
    }

    initialize(): Promise<void> {
        return new Promise((resolve, reject) => {
            const { getInt, getString} = CineEnvironment.getConfigManager();
            const apiPort = getInt(ConfigKeys.API_PORT, 1232);
            const mongoUri = getString(ConfigKeys.MONGO_URI, "");

            const dbPromise = this.databaseManager.initialize(mongoUri);
            const apiPromise = this.api.initialize(apiPort);

            Promise.all([dbPromise, apiPromise]).then(() => {
                this.routeManager.initialize(this.api.app);
                resolve();
            }).catch(err => reject(err));
        });
    }
}