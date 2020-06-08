import Logger, { LogLevel } from "../misc/Logger";
import CineEnvironment from "../CineEnvironment";
import { ConfigKeys } from "../misc/Constants";
import DatabaseManager from "../database/DatabaseManager";
import Api from "./Api";
import MovieManager from "./movies/MovieManager";

const writeLine = Logger.generateLogger("Core");

export default class Cine {
    private api: Api;
    private movieManager: MovieManager;
    private databaseManager: DatabaseManager;

    constructor() {
        this.api = new Api();
        this.movieManager = new MovieManager();
        this.databaseManager = new DatabaseManager();
    }

    initialize(): Promise<void[]> {
        const dbName = CineEnvironment.getConfigManager().getValue<string>(ConfigKeys.dbName);
        const dbHost = CineEnvironment.getConfigManager().getValue<string>(ConfigKeys.dbHost);
        const apiPort = CineEnvironment.getConfigManager().getValue<number>(ConfigKeys.apiPort);

        const dbPromise = this.databaseManager.initialize(dbHost, dbName);
        const apiPromise = this.api.initialize(apiPort);
        const movieManagerPromise = this.movieManager.initialize();

        return Promise.all([dbPromise, apiPromise, movieManagerPromise]);
    }
}