import Logger, { LogLevel } from "./misc/Logger";
import ConfigManager from "./misc/ConfigManager";
import Cine from "./core/Cine";

const TAG = "CineEnvironment";
const CONFIG_FILE = "config.json";

export default class CineEnvironment {
    private static instance: CineEnvironment;
    static getInstance(): CineEnvironment {
        if (this.instance == null) {
            this.instance = new CineEnvironment();
        }
        return this.instance;
    }

    private configManager: ConfigManager;
    private cine: Cine;

    constructor() {
        this.printSplash();
        this.configManager = new ConfigManager(CONFIG_FILE);
        this.cine = new Cine();
        this.configManager.initialize().then(() => {
            this.cine.initialize();
        });

    }

    printSplash() {
        console.log("Cine Api");
        console.log("Copyright (c) 2020 - filmstock.tv");

    }

    getConfigManager() {
        return this.configManager;
    }

    getCine() {
        return this.cine;
    }
}

CineEnvironment.getInstance();