import readline from 'readline';
import Logger, { LogLevel } from "./misc/Logger";
import ConfigManager from "./misc/ConfigManager";
import Cine from "./core/Cine";

const writeLine = Logger.generateLogger("CineEnvironment");
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
            writeLine("The environment has initialized successfully. Ready for connections.", LogLevel.Info);
            this.startCommandLoop();
        }).catch(err => {
            writeLine("Error initializing server: " + err, LogLevel.Info);
        });

    }

    printSplash() {
        console.log("     o                        o");
        console.log(",---..,---.,---.    ,---.,---..");
        console.log("|    ||   ||---'    ,---||   ||");
        console.log("`---'``   '`---'    `---^|---'`");
        console.log("                         |     ");
        console.log("1.0.0 alpha");
        console.log("Copyright (c) 2020 - filmstock.tv");
        console.log();
    }

    async startCommandLoop() {
        const reader = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        for await (const line of reader) {
            switch (line) {
                case "stop":
                    return;
                default:
                    writeLine("Invalid command", LogLevel.Info);
                    break;
            }
        }

    }

    getConfigManager() {
        return this.configManager;
    }

    getCine() {
        return this.cine;
    }
}

CineEnvironment.getInstance();