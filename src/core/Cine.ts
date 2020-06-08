import Logger, { LogLevel } from "../misc/Logger";
import CineEnvironment from "../CineEnvironment";
import { ConfigKeys } from "../misc/Constants";
import DatabaseManager from "../database/DatabaseManager";
import Api from "./Api";
import MovieManager from "./movies/MovieManager";
import RouteManager from "./controllers/RouteManager";

const writeLine = Logger.generateLogger("Core");

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
            const dbName = CineEnvironment.getConfigManager().getValue<string>(ConfigKeys.dbName);
            const dbHost = CineEnvironment.getConfigManager().getValue<string>(ConfigKeys.dbHost);
            const apiPort = CineEnvironment.getConfigManager().getValue<number>(ConfigKeys.apiPort);

            const dbPromise = this.databaseManager.initialize(dbHost, dbName);
            const apiPromise = this.api.initialize(apiPort);

            Promise.all([dbPromise, apiPromise]).then(() => {
                this.routeManager.initialize(this.api.app);
                resolve();
            }).catch(err => reject(err));
        });
    }
}