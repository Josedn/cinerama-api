import Logger, { LogLevel } from "../misc/Logger";
import CineEnvironment from "../CineEnvironment";
import { ConfigKeys } from "../misc/Constants";
import DatabaseManager from "../database/DatabaseManager";
import Api from "./Api";

const writeLine = Logger.generateLogger("Core");

export default class Cine {
    private api: Api;

    constructor() {
        this.api = new Api();
    }

    initialize() {
        const dbName = CineEnvironment.getConfigManager().getValue<string>(ConfigKeys.dbName);
        const dbHost = CineEnvironment.getConfigManager().getValue<string>(ConfigKeys.dbHost);
        const apiPort = CineEnvironment.getConfigManager().getValue<number>(ConfigKeys.apiPort);

        const dbPromise = DatabaseManager.connect(dbHost, dbName);
        const apiPromise = this.api.initialize(apiPort)

        return Promise.all([dbPromise, apiPromise]);
    }
}