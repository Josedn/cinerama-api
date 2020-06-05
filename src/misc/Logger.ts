export default class Logger {
    private static instance: Logger;
    private logLevel: LogLevel;

    private static getInstance(): Logger {
        if (this.instance == null) {
            this.instance = new Logger(LogLevel.Verbose);
        }
        return this.instance;
    }

    static generateLogger(tag: string) {
        return (text: string, logLevel: LogLevel) => this.writeLine(text, logLevel, tag);
    }

    static writeLine(text: string, logLevel: LogLevel, tag: string) {
        this.getInstance().writeLine(text, logLevel, tag);
    }

    static setLogLevel(logLevel: LogLevel) {
        this.getInstance().setLogLevel(logLevel);
    }

    private constructor(logLevel: LogLevel) {
        this.logLevel = logLevel;
    }

    private setLogLevel(logLevel: LogLevel) {
        this.logLevel = logLevel;
    }

    private writeLine(text: string, logLevel: LogLevel, tag: string) {
        if (this.canLog(logLevel)) {
            console.log("[" + logLevel.toString() + "][" + tag + "] - " + text);
        }
    }

    private canLog(logLevel: LogLevel) {
        return this.logLevel <= logLevel;
    }
}

export enum LogLevel {
    Debug = "Debug",
    Verbose = "Verbose",
    Warning = "Warning",
    Info = "Info",
}
