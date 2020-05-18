// Import the neccesary modules.
import expressWinston from "express-winston";
import fs from "fs";
import winston from "winston";
import { tempDir } from "./Constants";
import e from "express";

export default class Logger {
    pretty: boolean;
    verbose: boolean;
    logger: winston.Logger;
    expressLogger: e.Handler;

    /**
     * Create a logger object.
     * @param pretty - Debug mode for no output.
     * @param verbose - Debug mode for extra output
     */

    constructor(pretty: boolean, verbose: boolean) {
        this.pretty = pretty;
        this.verbose = verbose;

        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir);
        }

        /**
     * The log levels Winston will be using.
     * @type {Object}
     */

        //if (this.pretty) {
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.json(),
            defaultMeta: { service: 'user-service' },
            transports: [
                //
                // - Write all logs with level `error` and below to `error.log`
                // - Write all logs with level `info` and below to `combined.log`
                //
                new winston.transports.File({ filename: 'error.log', level: 'error' }),
                new winston.transports.File({ filename: 'combined.log' })
            ]
        });

        this.logger.add(new winston.transports.Console({
            format: winston.format.simple()
        }));

        this.expressLogger = expressWinston.logger({
            winstonInstance: this.logger,
            expressFormat: true,
            meta: false
        });
        //}
    }

}
