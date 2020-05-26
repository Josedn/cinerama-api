export default class Logger {
    private static instance: Logger;
    static getLogger(): Logger {
        if (this.instance == null) {
            this.instance = new Logger();
        }
        return this.instance;
    }

    
}

export enum LogLevel {
    Debug,
    Verbose,
    Warning,
    Info,
    None
}