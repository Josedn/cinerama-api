export default class Logger {
    private static instance: Logger;
    private logLevel: LogLevel;

    static getInstance(): Logger {
        if (this.instance == null) {
            this.instance = new Logger(LogLevel.Verbose);
        }
        return this.instance;
    }

    constructor(logLevel: LogLevel) {
        this.logLevel = logLevel;
    }

    setLogLevel(logLevel: LogLevel) {
        this.logLevel = logLevel;
    }

    writeLine(text: string, logLevel: LogLevel, tag: string) {
        if (this.canLog(logLevel)) {
            console.log("[" + logLevel.toString() + "][" + tag + "] - " + text);
        }
    }

    canLog(logLevel: LogLevel) {
        return this.logLevel <= logLevel;
    }
}

export enum LogLevel {
    Debug = "Debug",
    Verbose = "Verbose",
    Warning = "Warning",
    Info = "Info",
}
