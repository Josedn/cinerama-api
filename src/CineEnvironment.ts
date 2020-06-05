import readline from 'readline';
import Logger, { LogLevel } from "./misc/Logger";
import ConfigManager from "./misc/ConfigManager";
import Cine from "./core/Cine";

const writeLine = Logger.generateLogger("CineEnvironment");
const CONFIG_FILE = "config.json";

export default class CineEnvironment {
    private static configManager: ConfigManager;
    private static cine: Cine;
    private static initialized: boolean;

    static initialize() {
        if (this.initialized) {
            writeLine("Environment already initialized!", LogLevel.Warning);
            return;
        }
        this.initialized = true;
        this.printSplash();
        this.configManager = new ConfigManager(CONFIG_FILE);
        this.cine = new Cine();
        this.configManager.initialize().then(found => {
            this.cine.initialize().then(() => {
                writeLine("The environment has initialized successfully. Ready for connections.", LogLevel.Info);
                //this.startCommandLoop();
            }).catch(err => {
                writeLine("Error initializing server: " + err, LogLevel.Info);
                process.exit(0);
            });
        }).catch(err => {
            writeLine("Error with configuration file: " + err, LogLevel.Info);
            process.exit(0);
        });
    }

    private static printSplash() {
        console.log("     o                        o");
        console.log(",---..,---.,---.    ,---.,---..");
        console.log("|    ||   ||---'    ,---||   ||");
        console.log("`---'``   '`---'    `---^|---'`");
        console.log("                         |     ");
        console.log("1.0.0 alpha");
        console.log("Copyright (c) 2020 - filmstock.tv");
        console.log();
    }

    private static async startCommandLoop() {
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

    static getCine() {
        return this.cine;
    }

    static getConfigManager() {
        return this.configManager;
    }
}

CineEnvironment.initialize();